import Joi from "@hapi/joi";

export const registerBody = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    username: Joi.string()
        .min(2)
        .max(32)
        .required(),
    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp("^((?=.*[a-z])(?=.*[A-Zd])(?=.*[a-zA-Z]).{8,})$"))
});
