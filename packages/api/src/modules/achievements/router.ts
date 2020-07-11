import Router from "../Router";
import addAchievement from "./actions/addAchievement";

const router = new Router({ prefix: "/achievement" });

router.post("/addAchievement", async (ctx, next) => {
    const { name, description, difficulty, requirements } = ctx.params;

    await addAchievement({ name, description, difficulty, requirements });

    ctx.status = 200;
    ctx.body = "Successfully added achievement";

    await next();
});

export default router.routes();
