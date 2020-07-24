import request from "supertest";

import findUser from "../users/actions/findUser";

import { server } from "../../index";

const agent = request.agent(server);

describe("Verification email", async () => {
    it("Send verification email", async () => {
        // sendVerificationEmail("73sampleperson@gmail.com", "https://google.com");
        // I commented this out because I don't want to be emailed every time I run the tests.
    });

    it("Verify user email", async () => {
        const user = await findUser("id", 4);
        await agent
            .get(`/api/email/verify/${4}/${user!.emailKey}`)
            .set("Accept", "application/json")
            .expect(302);
    });
});
