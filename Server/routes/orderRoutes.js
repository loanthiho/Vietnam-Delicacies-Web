const express = require('express');
const router = express.Router();
const orderCtl = require('../controllers/orderCtl');
const { checkAuth } = require('../middleware/check-auth');


router.post('/', checkAuth, orderCtl.create);

// router.get('/', checkAuth, orderCtl.commonGetAll);
router.get('/', checkAuth, orderCtl.getAll);
router.get('/seller', checkAuth, orderCtl.sellerGetAll);
router.patch('/:id', checkAuth, orderCtl.updateStatus);
module.exports = router;