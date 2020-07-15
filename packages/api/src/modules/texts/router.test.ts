import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";

const agent = request.agent(server);

const newText = {
    title: "le pepp",
    text: "This is a text!",
    difficulty: 1,
    author: 1,
    tutorial: false,
    ordered: true
};

const newRandomText = {
    title: "le pepp",
    text: "this is a text",
    difficulty: 1,
    author: 1,
    tutorial: false,
    ordered: false
};

describe("Texts routes", async () => {
    // We don't need to rerun migrations or seeds because we did in the auth route

    it("Adds texts", async () => {
        await agent.post("/api/auth/login").send({
            email: "UserUser@fake.com",
            password: "UserPass"
        });

        await agent
            .post(`/api/texts/addText/`)
            .send(newText)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);

        const response = await agent
            .post(`/api/texts/addText/`)
            .send(newRandomText)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);

        expect(response.body.message).to.deep.equal("Successfully added text");
    });

    it("Gets all texts", async () => {
        const response = await agent
            .get(`/api/texts/getAllTexts/`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).to.deep.equal([
            { ...newText, id: 1, requirements: null },
            { ...newRandomText, id: 2, requirements: null }
        ]);
    });

    it("Gets a random text", async () => {
        const response = await agent
            .get(`/api/texts/getRandomText/`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

        expect([
            { ...newText, id: 1, requirements: null },
            { ...newRandomText, id: 2, requirements: null }
        ]).to.deep.include(response.body);
    });
});
