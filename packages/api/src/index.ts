import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import errorHandler from "./common/error/middleware/errorHandler";

import apiRouter from "./modules/apiRouter";

const app = new Koa();
const router = new Router();

const port = +(process.env.PORT ?? 8090);

app.use(bodyParser());
app.use(json());

if (process.env.NODE_ENV === "development") {
    app.use(logger());
}

app.use(errorHandler());

router.use(apiRouter);

app.use(router.routes()).use(router.allowedMethods());

export const server = app.listen(port, () => {
    console.info(`Koa app started and listening on port ${port}! 🚀`);
});
