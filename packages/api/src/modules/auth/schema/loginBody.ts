import Joi from "@hapi/joi";

export const loginBody = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required()
});
