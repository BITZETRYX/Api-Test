const Joi = require('joi');

const orderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    )
    .min(1)
    .required(),
  notes: Joi.string().max(500).allow('').optional()
});

module.exports = { orderSchema };