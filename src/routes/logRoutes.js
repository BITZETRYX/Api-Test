const express = require('express');
const { listLogs } = require('../controllers/logController');
const { authRequired, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', authRequired, requireRole('admin'), listLogs);

module.exports = router;