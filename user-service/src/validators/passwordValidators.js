const Joi = require('joi');

const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

module.exports = { forgotSchema, resetSchema };
