import Joi from "joi";

const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

export const userSchemaRegister = Joi.object({
  username: Joi.string().required().min(5),
  full_name: Joi.string().required().min(3).max(100),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(5)
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password harus memiliki setidaknya satu huruf besar (uppercase) dan satu angka",
      "string.min":
        "Password setidaknya harus memiliki panjang {#limit} karakter",
      "any.required": "Password diperlukan",
    }),
  profile_picture: Joi.optional(),
  profile_description: Joi.optional(),
});

export const userSchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().required().min(5),
  full_name: Joi.string().required().min(3).max(100),
  profile_description: Joi.optional(),
});
