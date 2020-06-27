import { Middleware, DefaultState, Context } from "koa";

import { HttpError } from "../../../common/error/classes/httpError";

export const requireAuthenticated = (): Middleware<
    DefaultState,
    Context
> => async (ctx, next) => {
    const session = ctx.session!;

    if (!session?.populated) {
        throw new HttpError(401, "You don't seem to be logged in");
    }
    ctx.session = session;

    await next();
};
