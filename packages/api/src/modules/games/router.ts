import Router from "../Router";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import { createGame } from "./actions/createGame";
import { removeOldGame } from "./actions/removeOldGame";
import checkPB from "./actions/checkPB";
import { newGameBody } from "./schema/newGameBody";
import { validateSchema } from "../schema/middleware/validateSchema";
import getAllGames from "./actions/getAllGames";
import getAllPbs from "./actions/getAllPbs";

const router = new Router({ prefix: "/games" });

router.post(
    "/newGame",
    requireAuthenticated(),
    validateSchema(newGameBody, "body"),
    async (ctx, next) => {
        const { wpm, rawwpm, accuracy, difficulty, textid } = ctx.request.body;
        const { user } = ctx.session!;
        const newGame = await createGame(
            user,
            wpm,
            rawwpm,
            accuracy,
            difficulty,
            textid
        );
        await removeOldGame(user);
        await checkPB(newGame);
        ctx.status = 201;
        ctx.body = {
            message: "Successfully created a game!"
        };
        await next();
    }
);

router.get("/", async (ctx, next) => {
    ctx.status = 200;
    ctx.body = await getAllGames();
    await next();
});

router.get("/getAllPbs", async (ctx, next) => {
    ctx.status = 200;
    ctx.body = await getAllPbs();
    await next();
});
export default router.routes();
