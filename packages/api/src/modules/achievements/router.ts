import Router from "../Router";
import addAchievement from "./actions/addAchievement";
import { HttpError } from "../../common/error/classes/httpError";
import editAchievement from "./actions/editAchievement";

const router = new Router({ prefix: "/achievement" });

router.post("/addAchievement", async (ctx, next) => {
    const { name, description, difficulty, requirements } = ctx.request.body;

    await addAchievement({ name, description, difficulty, requirements });

    ctx.status = 200;
    ctx.body = "Successfully added achievement";

    await next();
});

router.patch("/editAchievement", async (ctx, next) => {
    const { id, details } = ctx.request.body;
    const resp = await editAchievement(id, details);
    if (!resp) {
        throw new HttpError(400, "No achievement with that ID exists");
    }
    ctx.status = 200;
    ctx.body = "Successfully edited achievement";
    await next();
});

export default router.routes();
