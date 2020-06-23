import { Middleware } from "koa";
import { HttpError } from "../classes/httpError";

export default (): Middleware => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof HttpError) {
            ctx.status = err.status;
            ctx.body = {
                status: err.status,
                message: err.reason
            };

            return;
        }

        console.error(err);

        if (err.code) {
            ctx.status = err.code;
        }
        ctx.body = {
            status: err.code,
            message: "Internal Server Error"
        };
    }
};
