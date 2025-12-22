const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const Product = require('../models/Product');

const listProducts = asyncHandler(async (req, res) => {
  const { category, inStock } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (typeof inStock !== 'undefined') {
    filter.inStock = inStock === 'true';
  }

  const products = await Product.find(filter).sort({ name: 1 });

  sendResponse(res, 200, {
    data: products
  });
});

module.exports = { listProducts };