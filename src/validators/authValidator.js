const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  phone: Joi.string().min(7).max(20).required(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(128).required()
});

const loginSchema = Joi.object({
  phone: Joi.string().min(7).max(20).required(),
  password: Joi.string().min(6).max(128).required()
});

module.exports = { registerSchema, loginSchema };