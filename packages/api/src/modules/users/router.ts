import { HttpError } from "../../common/error/classes/httpError";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import getPBs from "../games/actions/getPB";
import Router from "../Router";
import { validateSchema } from "../schema/middleware/validateSchema";
import { createUser } from "./actions/createUser";
import getUserData from "./actions/getUserData";
import userAchievements from "./actions/userAchievements";
import updateCountry from "./actions/updateCountry";
import updateDescription from "./actions/updateDescription";
import userGames from "./actions/userGames";
import { registerBody } from "./schema/registerBody";
import { UpdateCountry } from "./schema/updateCountry";
import { RegisterBody } from "./types/RegisterBody";
import changePassword from "./actions/changePassword";
import {
    keyValid,
    forgotPassword,
    resetPassword
} from "./actions/forgotPassword";
import { requireAdmin } from "../auth/middleware/requireAdmin";
import getAllUsers from "./actions/getAllUsers";
import deleteUser from "./actions/deleteUser";
import editUser from "./actions/editUser";

const router = new Router({ prefix: "/users" });

router.get("/", requireAdmin(), async (ctx, next) => {
    ctx.status = 200;
    ctx.body = await getAllUsers();
    await next();
});

router.delete("/deleteUser", requireAdmin(), async (ctx, next) => {
    const { id } = ctx.request.body;
    await deleteUser(id);
    ctx.status = 200;
    ctx.body = {
        message: "User deleted"
    };
    await next();
});

// TODO: Add schema validation for this
router.patch("/editUser", requireAdmin(), async (ctx, next) => {
    const { property, id, newValue } = ctx.request.body;
    await editUser(property, id, newValue);
    await next();
});

router.post(
    "/createUser",
    validateSchema(registerBody, "body"),
    async (ctx, next) => {
        const { name, password, email, country } = ctx.request
            .body as RegisterBody;

        const user = await createUser({ email, name, password, country });

        if (!user) {
            throw new HttpError(400, "That username seems to be already taken");
        }

        ctx.session!.user = user.id;
        ctx.status = 201;
        ctx.body = {
            status: 201,
            message: "Successfully created",
            id: user.id
        };
        await next();
    }
);

router.get("/userGames/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const games = await userGames("id", id);

    ctx.status = 200;
    ctx.body = { games };

    await next();
});

router.get("/userGameStats/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const games = await userGames("id", id);

    if (!games || games.length === 0) {
        ctx.status = 400;
        return (ctx.body = { message: "No game stats." });
    }

    const averageWPM =
        games.map(l => l.wpm).reduce((acc, cur) => acc + cur) / games.length;
    const averageRawWPM =
        games.map(l => l.rawwpm).reduce((acc, cur) => acc + cur) / games.length;
    const averageAccuracy =
        games.map(l => l.accuracy).reduce((acc, cur) => acc + cur) /
        games.length;

    ctx.status = 200;
    ctx.body = { averageAccuracy, averageRawWPM, averageWPM };

    await next();
});

router.get("/userPBs/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const game = await getPBs(id);

    if (!game) {
        ctx.status = 400;
        return (ctx.body = { message: "That user does not have any PBs!" });
    }

    ctx.status = 200;
    ctx.body = game;

    await next();
});

router.get("/userData/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const data = await getUserData("id", id);

    if (!data) {
        ctx.status = 404;
        return (ctx.body = { message: "That users doesn't exist." });
    }

    ctx.status = 200;
    ctx.body = data;

    await next();
});

router.get("/achievements/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const achievements = await userAchievements(id);

    if (achievements === null) {
        throw new HttpError(400, "That user does not exist!");
    }

    ctx.status = 200;
    ctx.body = achievements;
    await next();
});

router.patch(
    "/updateCountry",
    requireAuthenticated(),
    validateSchema(UpdateCountry, "body"),
    async (ctx, next) => {
        const { country } = ctx.request.body;
        const { user } = ctx.session!;

        await updateCountry("id", user, country);

        ctx.status = 201;
        ctx.body = {
            message: "Successfully updated countrycode!"
        };

        await next();
    }
);

router.patch(
    "/updateDescription",
    requireAuthenticated(),
    validateSchema(UpdateCountry, "body"),
    async (ctx, next) => {
        const { description } = ctx.request.body;
        const { user } = ctx.session!;

        await updateDescription("id", user, description);

        ctx.status = 200;
        ctx.body = {
            message: "Successfully updated description!"
        };

        await next();
    }
);

router.patch("/changePassword", requireAuthenticated(), async (ctx, next) => {
    const { user } = ctx.session!;

    const { oldPassword, newPassword } = ctx.request.body;

    const response = await changePassword(user, oldPassword, newPassword);

    if (response) {
        throw new HttpError(400, response);
    }

    ctx.status = 200;
    ctx.body = { message: "Successfully changed password" };

    await next();
});

router.post("/requestForgotPassword", async (ctx, next) => {
    const { email } = ctx.request.body;

    const emailExists = await forgotPassword(email);

    if (!emailExists) {
        throw new HttpError(400, "The provided email does not have an account");
    }

    ctx.status = 200;
    ctx.body = {
        message: "Success, an email has been sent to your email address"
    };

    await next();
});

router.get("/forgotPassword/:key", async (ctx, next) => {
    const { key } = ctx.params;

    if (keyValid(key)) {
        ctx.status = 200;
        ctx.redirect("success url");
    } else {
        ctx.status = 400;
        ctx.redirect("failure url");
    }
    await next();
});

router.post("/resetPassword", async (ctx, next) => {
    const { key, oldPassword, newPassword } = ctx.request.body;

    const response = await resetPassword(key, oldPassword, newPassword);

    if (response) {
        throw new HttpError(400, response);
    }

    ctx.status = 200;
    ctx.body = {
        message: "Successfully reset password"
    };

    await next();
});

export default router.routes();
