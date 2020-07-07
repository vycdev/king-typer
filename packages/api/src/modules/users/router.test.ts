import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";

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

        expect(response.body).to.deep.equal({
            status: 400,
            message: "That username seems to be already taken"
        });
    });

    describe("Game stats", async () => {
        before(async () => {
            await agent
                .post("/api/games/newGame")
                .send({ wpm: 60, rawwpm: 80, accuracy: 75 });

            await agent
                .post("/api/games/newGame")
                .send({ wpm: 90, rawwpm: 100, accuracy: 90 });
        });

        it("Gets the games of a user", async () => {
            const response = await agent
                .get(`/api/users/userGames/`)
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
});
