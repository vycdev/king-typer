import Router from "../Router";
import { requireAdmin } from "../auth/middleware/requireAdmin";
import addText from "./actions/addText";
import getAllTexts from "./actions/getAllTexts";
import getRandomText from "./actions/getRandomText";

const router = new Router({ prefix: "/texts" });

router.post("/addText", requireAdmin(), async (ctx, next) => {
    const { text, difficulty, ordered, tutorial } = ctx.request.body;
    const { user } = ctx.session!;
    await addText(text, difficulty, user, ordered, tutorial);
    ctx.status = 201;
    ctx.body = "Successfully added text";
    await next();
});

router.get("/getAllTexts", async (ctx, next) => {
    const texts = await getAllTexts();
    ctx.status = 200;
    ctx.body = texts;
    await next();
});

router.get("/getRandomText", async (ctx, next) => {
    const { typed, ordered } = ctx.params.body;
    const text = await getRandomText(typed, ordered);
    ctx.status = 200;
    ctx.body = text;
    await next();
});

export default router.routes();
