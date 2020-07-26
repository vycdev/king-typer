import Router from "../Router";

import { HttpError } from "../../common/error/classes/httpError";
import { verifyUserEmail } from "../users/actions/verifyUserEmail";
import updateUserRole from "../users/actions/updateUserRole";
import findUser from "../users/actions/findUser";
import sendVerificationEmail from "./actions/sendVerificationEmail";
import generateVerification from "./actions/generateVerification";

const router = new Router({ prefix: "/email" });

router.get("/verify/:userid/:key", async (ctx, next) => {
    const { userid, key } = ctx.params;

    const res = verifyUserEmail(userid, key);

    if (!res) {
        throw new HttpError(400, "That link is invalid");
    }

    await updateUserRole(userid, "member");

    ctx.status = 302;
    ctx.redirect(`${process.env.CORS_ORIGIN}/#/profiles/${userid}`);

    await next();
});

router.get("/sendVerificationEmail/:userid", async (ctx, next) => {
    const { userid } = ctx.params;

    const user = await findUser("id", userid);

    if (!user) {
        throw new HttpError(400, "That user doesn't exist xd");
    }

    if (user.role === "unverified") {
        await sendVerificationEmail(
            user.email,
            (await generateVerification(userid))!
        );
    } else {
        throw new HttpError(400, "That user is already verified!");
    }

    ctx.status = 200;
    ctx.body = {
        message: "Success!"
    };

    await next();
});

export default router.routes();
