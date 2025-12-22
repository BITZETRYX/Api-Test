const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { sendResponse } = require('../utils/response');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { orderSchema } = require('../validators/orderValidator');

const createOrder = asyncHandler(async (req, res) => {
  const { error, value } = orderSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ApiError(400, 'Validation failed', error.details.map((item) => item.message));
  }

  if (!req.user) {
    throw new ApiError(401, 'User must be registered to place an order');
  }

  const { items, notes } = value;
  const productIds = items.map((item) => item.productId);

  const products = await Product.find({ _id: { $in: productIds } });
  if (products.length !== productIds.length) {
    throw new ApiError(400, 'One or more products were not found');
  }

  const productMap = new Map(products.map((product) => [product._id.toString(), product]));

  const orderItems = items.map((item) => {
    const product = productMap.get(item.productId);
    const lineTotal = product.price * item.quantity;
    return {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      lineTotal
    };
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const order = await Order.create({
    user: req.user._id,
    userPhone: req.user.phone,
    items: orderItems,
    totalAmount,
    notes
  });

  sendResponse(res, 201, {
    message: 'Order placed successfully',
    data: order
  });
});

const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  sendResponse(res, 200, { data: orders });
});

module.exports = { createOrder, listOrders };