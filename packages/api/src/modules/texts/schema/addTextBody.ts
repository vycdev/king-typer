import Joi from "@hapi/joi";

export const addTextBody = Joi.object({
    title: Joi.string()
        .min(1)
        .max(40)
        .required(),
    text: Joi.string()
        .min(1)
        .required(),
    difficulty: Joi.number()
        .min(1)
        .max(10)
        .required(),
    ordered: Joi.boolean(),
    tutorial: Joi.boolean()
});
