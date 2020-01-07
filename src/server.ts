import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 5000;

function init() {
    console.info(`Server started on port ${port}`);
}

router.get("/", (ctx, next) => {
    ctx.body = "Working!";
});

app.use(logger());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, init);
