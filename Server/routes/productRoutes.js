const express = require('express');
const router = express.Router();
const productCtl = require('../controllers/productCtl');
const { checkAuth } = require('../middleware/check-auth');


router.post('/', checkAuth, productCtl.create)
router.patch('/', checkAuth, productCtl.update)
router.get('/', productCtl.getAll);
router.get('/:id', productCtl.getOne);


module.exports = router;