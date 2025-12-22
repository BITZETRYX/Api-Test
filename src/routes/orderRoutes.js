const express = require('express');
const { createOrder, listOrders } = require('../controllers/orderController');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.use(authRequired);
router.post('/', createOrder);
router.get('/', listOrders);

module.exports = router;