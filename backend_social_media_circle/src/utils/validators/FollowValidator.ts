import Joi from "joi";

export const followSchema = Joi.object({
  anotherAccount: Joi.number().required(),
});

export const unfollowSchema = Joi.object({
  anotherAccount: Joi.number().required(),
});
