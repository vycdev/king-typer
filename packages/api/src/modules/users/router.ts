import Router from "../Router";

import { createUser } from "./actions/createUser";
import { HttpError } from "../../common/error/classes/httpError";
import { validateSchema } from "../schema/middleware/validateSchema";
import { registerBody } from "./schema/registerBody";
import { RegisterBody } from "./types/RegisterBody";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import userGames from "./actions/userGames";
import getPB from "../games/actions/getPB";

const router = new Router({ prefix: "/users" });

router.post(
    "/createUser",
    validateSchema(registerBody, "body"),
    async (ctx, next) => {
        const { name, password, email } = ctx.request.body as RegisterBody;

        const user = await createUser({ email, name, password });

        if (!user) {
            throw new HttpError(400, "That username seems to be already taken");
        }

        ctx.session!.user = user.id;
        ctx.status = 201;
        ctx.body = { status: 201, message: "Successfully created" };
        await next();
    }
);

router.get("/userGames", requireAuthenticated(), async (ctx, next) => {
    const { user } = ctx.session!;

    const games = await userGames("id", user);

    ctx.status = 200;
    ctx.body = { games };

    await next();
});

router.get("/userGameStats/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const games = await userGames("id", id);

    if (!games) {
        ctx.status = 400;
        return (ctx.body = "No user with that ID exists!");
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

router.get("/userPB/:id", async (ctx, next) => {
    const { id } = ctx.params;

    const game = await getPB(id);

    if (!game) {
        ctx.status = 400;
        return (ctx.body = "That user does not have a PB!");
    }

    ctx.status = 200;
    ctx.body = game;

    await next();
});

export default router.routes();
