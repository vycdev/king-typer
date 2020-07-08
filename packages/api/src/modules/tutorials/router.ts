import Router from "../Router";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import completeTutorial from "./actions/completeTutorial";
import { HttpError } from "../../common/error/classes/httpError";
import getTutorial from "./actions/getTutorial";
import getRandomTutorial from "./actions/getRandomTutorial";

const router = new Router({ prefix: "/tutorials" });

router.post("/completeTutorial", requireAuthenticated(), async (ctx, next) => {
    const { id } = ctx.request.body;
    const { user } = ctx.session!;
    const success = await completeTutorial(id, user);
    if (!success) {
        throw new HttpError(400, "That tutorial does not exist!");
    }
    ctx.status = 200;
    ctx.body = "Successfully completed tutorial";
    await next();
});

router.get("/:id", async (ctx, next) => {
    const { id } = ctx.params;
    console.log(`Received ${id}`);
    const tutorial = getTutorial(id);
    if (!tutorial) {
        throw new HttpError(400, "That tutorial does not exist!");
    }
    console.log(tutorial);
    ctx.status = 200;
    ctx.body = tutorial;
    await next();
});

router.get("/random", async (ctx, next) => {
    const tutorial = getRandomTutorial();
    ctx.status = 200;
    ctx.body = tutorial;
    await next();
});

export default router.routes();
