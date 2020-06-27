import { Middleware } from "koa";

const origin = String(process.env.CORS_ORIGIN);

export const allowCors = (): Middleware => async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", origin);
    ctx.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,PATCH,DELETE,OPTIONS"
    );
    ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested,With"
    );
    ctx.set("Access-Control-Allow-Credentials", "true");

    if (ctx.method === "OPTIONS") {
        ctx.status = 200;
        ctx.body = { status: 200, message: "OK" };
    }

    return next();
};
