import request from "supertest";

import { expect } from "chai";

import knex from "../../../db/knex";

import { server } from "../../";

import users from "../../../db/seeds/examples/users";
import achievements from "../../../db/seeds/examples/achievements";

const agent = request.agent(server);

const myCheevo = {
    name: "My cheevo",
    description: "Testing cheevo",
    difficulty: 69,
    requirements: {
        wpm: 69
    }
};

describe("Achievements router", () => {
    before(async function() {
        const { email, password } = users[0];
        this.timeout(20000);
        await knex.migrate.latest();
        await knex.seed.run();
        await agent.post("/api/auth/login").send({ email, password });
    });

    it("Adds an achievement", async () => {
        const response = await agent
            .post(`/api/achievements/addAchievement`)
            .send(myCheevo)
            .set("Accept", "application/text")
            .expect(201);

        expect(response.text).to.equal("Successfully added achievement");
    });

    it("Edits an achievement", async () => {
        const response = await agent
            .patch(`/api/achievements/editAchievement`)
            .send({ id: 3, details: { name: "Edited cheevo" } })
            .set("Accept", "application/text")
            .expect(200);

        expect(response.text).to.equal("Successfully edited achievement");
    });

    it("Cannot edit nonexistent achievement", async () => {
        const response = await agent
            .patch(`/api/achievements/editAchievement`)
            .send({ id: 4, details: { name: "Edited cheevo 2" } })
            .set("Accept", "application/json")
            .expect(400);

        expect(response.body.message).to.equal(
            "No achievement with that ID exists"
        );
    });

    it("Deletes an achievement", async () => {
        const response = await agent
            .delete(`/api/achievements/deleteAchievement`)
            .send({ id: 3 })
            .set("Accept", "application/text")
            .expect(200);

        expect(response.text).to.equal("Successfully deleted achievement");
    });

    it("Gets the cheevo list", async () => {
        const response = await agent
            .get("/api/achievements/")
            .set("Accept", "application/text")
            .expect(200);

        expect(response.body).to.deep.equal([
            { ...achievements[0], id: 1 },
            { ...achievements[1], id: 2 }
        ]);
    });
});
