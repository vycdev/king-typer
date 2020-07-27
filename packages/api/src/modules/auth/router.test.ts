import request from "supertest";

import { expect } from "chai";

import { server } from "../../";

import users from "../../../db/seeds/examples/users";

const agent = request.agent(server);

describe("Auth router", () => {
    it("Logs-in a user", async () => {
        const { email, name, password } = users[0];

        const response = await agent
            .post(`/api/auth/login`)
            .send({ email, password })
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).to.deep.equal({
            message: "Successfully log in",
            user: { name, role: "admin", id: 1 }
        });
    });

    it("Logs-out a user", async () => {
        const response = await agent
            .get(`/api/auth/logout`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.message).to.equal("Successfully logged out");
    });
});
