import Joi from "@hapi/joi";

export const UpdateCountry = Joi.object({
    country: Joi.string()
});
