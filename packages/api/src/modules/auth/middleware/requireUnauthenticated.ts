import { Middleware, DefaultState, Context } from "koa";

import { HttpError } from "../../../common/error/classes/httpError";

export const requireUnauthenticated = (): Middleware<
    DefaultState,
    Context
> => async (ctx, next) => {
    const session = ctx.session!;

    if (session.user) {
        throw new HttpError(401, "You seem to be already logged in");
    }

    await next();
};
