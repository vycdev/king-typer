import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";
import knex from "../../../db/knex";

const agent = request.agent(server);

const newUser = {
    email: "FakeyMcFakerson@fakemail.com",
    name: "SomeGuy",
    password: "WhatShouldITypeHere88@"
};

describe("Users routes", async () => {
    // We don't need to rerun migrations or seeds because we did in the auth route

    it("Creates an user", async function() {
        this.timeout(5000);
        const response = await agent
            .post(`/api/users/createUser/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);

        expect(response.body).to.deep.equal({
            id: 5,
            status: 201,
            message: "Successfully created"
        });
    });

    it("Fails to create an user with the same username", async () => {
        const response = await agent
            .post(`/api/users/createUser/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.message).to.equal(
            "That username seems to be already taken"
        );
    });

    it("Changes the password of a user", async () => {
        const response = await agent
            .patch("/api/users/changePassword")
            .send({
                oldPassword: "WhatShouldITypeHere88@",
                newPassword: "WhatShouldITypeHere99@"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.message).to.equal("Successfully changed password");
    });

    it("Can't change if the password provided is wrong", async () => {
        const response = await agent
            .patch("/api/users/changePassword")
            .send({
                oldPassword: "WhatShouldITypeHere88@",
                newPassword: "WhatShouldITypeHere44@"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.message).to.equal("Password does not match");
    });

    describe("Game stats", async () => {
        before(async () => {
            await agent.post("/api/games/newGame").send({
                wpm: 60,
                rawwpm: 80,
                accuracy: 75,
                difficulty: 3,
                textid: 1
            });

            await agent.post("/api/games/newGame").send({
                wpm: 90,
                rawwpm: 100,
                accuracy: 90,
                difficulty: 3,
                textid: 1
            });
        });

        it("Gets the games of a user", async () => {
            const response = await agent
                .get(`/api/users/userGames/5`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body.games.length).to.equal(2);
        });

        it("Gets the game stats of a user", async () => {
            const response = await agent
                .get(`/api/users/userGameStats/5`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body).to.deep.equal({
                averageAccuracy: 82.5,
                averageWPM: 75,
                averageRawWPM: 90
            });
        });

        it("Gets the PB of a user", async () => {
            const response = await agent
                .get(`/api/users/userPBs/5`)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(response.body[0].wpm).to.equal(60);
        });
    });

    describe("Forgotten password", () => {
        it("Can send an email", async () => {
            const response = await agent
                .post("/api/users/requestForgotPassword")
                .send({ email: "UserUser@fake.com" })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(response.body.message).to.equal(
                "Success, an email has been sent to your email address"
            );
            // I commented this out because I don't want to get spammed with "that email does not exist" emails.
        }).timeout(5000);

        it("Can hit forgot password link", async () => {
            const { key } = await knex("forgottenpasswords")
                .where({ email: "UserUser@fake.com" })
                .first();

            const response = await agent
                .get(`/api/users/forgotPassword/${key}`)
                .send({ email: "UserUser@fake.com" })
                .set("Accept", "application/text")
                .expect("Content-Type", /text/)
                .expect(302);

            expect(response.text).to.equal(
                `Redirecting to ${process.env.CORS_ORIGIN}/#/loginregister/resetPassword/${key}.`
            );
        });

        it("Can reset the password", async () => {
            const { key } = await knex("forgottenpasswords")
                .where({ email: "UserUser@fake.com" })
                .first();

            const response = await agent
                .post(`/api/users/resetPassword`)
                .send({ key, password: "newPass", confirmPassword: "newPass" })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body.message).to.equal(
                "Successfully reset password"
            );
        });
    });
});
