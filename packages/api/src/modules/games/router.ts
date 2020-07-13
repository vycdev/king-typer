import Router from "../Router";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import { createGame } from "./actions/createGame";
import { removeOldGame } from "./actions/removeOldGame";
import checkPB from "./actions/checkPB";
import { newGameBody } from "./schema/newGameBody";
import { validateSchema } from "../schema/middleware/validateSchema";

const router = new Router({ prefix: "/games" });

router.post(
    "/newGame",
    requireAuthenticated(),
    validateSchema(newGameBody, "body"),
    async (ctx, next) => {
        const { wpm, rawwpm, accuracy } = ctx.request.body;
        const { user } = ctx.session!;
        const newGame = await createGame(user, wpm, rawwpm, accuracy);
        await removeOldGame(user);
        await checkPB(newGame);
        ctx.status = 201;
        ctx.body = { message: "Successfully created a game!" };
        await next();
    }
);

export default router.routes();
