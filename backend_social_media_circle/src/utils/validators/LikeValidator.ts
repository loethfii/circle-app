import Joi from "joi";

export const likeSchema = Joi.object({
  threadId: Joi.number().required(),
});
