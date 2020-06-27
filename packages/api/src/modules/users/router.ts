import Router from "../Router";

import { createUser } from "./actions/createUser";
import { HttpError } from "../../common/error/classes/httpError";
import { validateSchema } from "../schema/middleware/validateSchema";
import { registerBody } from "./schema/registerBody";
import { RegisterBody } from "./types/RegisterBody";

const router = new Router({ prefix: "/users" });

router.post(
    "/createUser",
    validateSchema(registerBody, "body"),
    async (ctx, next) => {
        const { username, password, email } = ctx.request.body as RegisterBody;

        const user = await createUser({ email, username, password });

        if (!user) {
            throw new HttpError(400, "That username seems to be already taken");
        }

        ctx.session!.user = user.id;
        ctx.status = 201;
        ctx.body = { status: 201, message: "Successfully created" };
        await next();
    }
);
