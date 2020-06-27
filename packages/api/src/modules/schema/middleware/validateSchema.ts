import { Middleware } from "koa";

import { ObjectSchema } from "@hapi/joi";

import { HttpError } from "../../../common/error/classes/httpError";

type ValidationField = "body" | "params" | "query";

export const validateSchema = (
    schema: ObjectSchema,
    field: ValidationField
): Middleware => (ctx, next) => {
    const toValidate: Record<ValidationField, unknown> = {
        body: ctx.request.body,
        params: ctx.params,
        query: ctx.query
    };
    const result = schema.validate(toValidate[field]);
    if (result.error) throw new HttpError(400, "Invalid Syntax");
    return next();
};
