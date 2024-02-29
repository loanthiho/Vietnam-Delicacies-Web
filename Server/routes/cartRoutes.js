const express = require('express');
const router = express.Router();
const cartCtl = require('../controllers/cartCtl');
const { checkAuth } = require('../middleware/check-auth');

router.get('/', checkAuth, cartCtl.getAll);
router.get('/:id', checkAuth, cartCtl.getOne);
router.post('/:id', checkAuth, cartCtl.addCart);
router.post('/update-qty/:id', checkAuth, cartCtl.updateQuantity);
router.delete('/:id', checkAuth, cartCtl.removeCart)

module.exports = router;