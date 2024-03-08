const express = require('express');
const router = express.Router();
const orderCtl = require('../controllers/orderCtl');
const { checkAuth } = require('../middleware/check-auth');


router.post('/', checkAuth, orderCtl.create)

module.exports = router;