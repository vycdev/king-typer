import request from "supertest";

import { expect } from "chai";

import knex from "../../../db/knex";

import { server } from "../../";

import users from "../../../db/seeds/examples/users";

const agent = request.agent(server);

describe("Auth router", () => {
    before(async function() {
        this.timeout(5000);
        await knex.migrate.latest();
        await knex.seed.run();
    });

    it("Logs-in a user", async () => {
        const { email, username, password } = users[0];

        const response = await agent
            .post(`/api/auth/login`)
            .send({ email, password })
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).to.deep.equal({
            status: 200,
            message: "Successfully log in",
            user: { username, role: "admin" }
        });
    });

    it("Logs-out a user", async () => {
        const { email, password } = users[0];

        const response = await agent
            .get(`/api/auth/logout`)
            .send({ email, password })
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).to.deep.equal({
            status: 200,
            message: "Successfully logged out"
        });
    });
});
