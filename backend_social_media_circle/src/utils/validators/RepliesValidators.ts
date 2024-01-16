import Joi from "joi";

export const repliesSchema = Joi.object({
  content: Joi.string().required(),
  threadId: Joi.number().required(),
});
