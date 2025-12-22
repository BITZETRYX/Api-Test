const express = require('express');
const { checkRegistered } = require('../controllers/userController');

const router = express.Router();

router.get('/check', checkRegistered);

module.exports = router;