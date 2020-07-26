import Joi from "@hapi/joi";

export const newGameBody = Joi.object({
    wpm: Joi.number(),
    rawwpm: Joi.number(),
    accuracy: Joi.number(),
    textid: Joi.number(),
    difficulty: Joi.number()
});
