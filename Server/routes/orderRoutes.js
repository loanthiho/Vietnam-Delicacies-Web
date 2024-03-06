const express = require('express');
const router = express.Router();
const orderCtl = require('../controllers/orderCtl');


router.post('orders', orderCtl.create)

module.exports = router;