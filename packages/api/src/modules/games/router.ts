import Router from "../Router";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import { createGame } from "./actions/createGame";
import { removeOldGame } from "./actions/removeOldGame";
import checkPB from "./actions/checkPB";

const router = new Router({ prefix: "/games" });

router.post("/newGame", requireAuthenticated(), async (ctx, next) => {
    const { wpm, rawwpm, accuracy } = ctx.request.body;
    const { user } = ctx.session!;
    const newGame = await createGame(user, wpm, rawwpm, accuracy);
    await removeOldGame(user);
    await checkPB(newGame);
    ctx.status = 201;
    ctx.body = "Successfully created a game!";
    await next();
});

export default router.routes();
