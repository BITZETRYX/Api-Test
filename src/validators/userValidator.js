const Joi = require('joi');

const phoneCheckSchema = Joi.object({
  phone: Joi.string().min(7).max(20).required()
});

module.exports = { phoneCheckSchema };