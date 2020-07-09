import Router from "../Router";
import { requireAuthenticated } from "../auth/middleware/requireAuthenticated";
import completeTutorial from "./actions/completeTutorial";
import { HttpError } from "../../common/error/classes/httpError";
import getTutorial from "./actions/getTutorial";
import getAllTutorials from "./actions/getAllTutorials";

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
    const tutorial = getTutorial(id);
    if (!tutorial) {
        throw new HttpError(400, "That tutorial does not exist!");
    }
    ctx.status = 200;
    ctx.body = tutorial;
    await next();
});

router.get("/", async (ctx, next) => {
    const tutorials = (await getAllTutorials()).sort(
        (a, b) => a.difficulty - b.difficulty
    );
    ctx.status = 200;
    ctx.body = tutorials;
    await next();
});

export default router.routes();
