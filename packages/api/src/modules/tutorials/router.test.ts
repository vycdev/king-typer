import request from "supertest";
import { expect } from "chai";

import { server } from "../../index";
import addText from "../texts/actions/addText";
import User from "../users/types/User";
import knex from "../../../db/knex";

const agent = request.agent(server);

describe("Tutorials routes", async () => {
    // We don't need to rerun migrations or seeds because we did in the auth route

    it("Completes a tutorial", async () => {
        await agent.post("/api/auth/login").send({
            email: "Deliver@bullets.com",
            password: "MaoGay"
        });

        await addText("blah", 1, 1, false, true);
        const response = await agent
            .post(`/api/tutorials/completeTutorial/`)
            .send({ id: 3 })
            .set("Accept", "application/text")
            .expect("Content-Type", /text/)
            .expect(200);

        expect(response.text).to.deep.equal("Successfully completed tutorial");
    });

    it("Cannot complete a non-existent tutorial", async () => {
        const response = await agent
            .post(`/api/tutorials/completeTutorial/`)
            .send({ id: 1 })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).to.deep.equal({
            status: 400,
            message: "That tutorial does not exist!"
        });
    });

    it("Gets tutorials completed for the user", async () => {
        const user = await knex<User>("users")
            .where({
                email: "Deliver@bullets.com"
            })
            .first();

        expect(user?.tutorials).to.deep.equal([3]);
    });
});
