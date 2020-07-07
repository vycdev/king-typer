import Router from "../Router";
import { requireAdmin } from "../auth/middleware/requireAdmin";
import addText from "./actions/addText";
import getAllTexts from "./actions/getAllTexts";
import getRandomText from "./actions/getRandomText";

const router = new Router({ prefix: "/texts" });

router.post("/addText", requireAdmin(), async (ctx, next) => {
    const { text, ordered } = ctx.request.body;
    await addText(text, ordered);
    ctx.status = 201;
    ctx.body = "Successfully added text";
    await next();
});

router.post("/getAllTexts", async (ctx, next) => {
    const texts = await getAllTexts();
    ctx.status = 200;
    ctx.body = texts;
    await next();
});

router.post("/getRandomText", async (ctx, next) => {
    const text = await getRandomText();
    ctx.status = 200;
    ctx.body = text;
    await next();
});

export default router.routes();
