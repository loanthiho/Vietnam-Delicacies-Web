const express = require('express');
const router = express.Router();
const productCtl = require('../controllers/productCtl');
const { checkAuth } = require('../middleware/check-auth');
const upload = require('../middleware/multer');


router.post('/', checkAuth, upload.array('files', 10), productCtl.create);
router.patch('/:id', checkAuth, productCtl.update);
router.delete('/:id', checkAuth, productCtl.remove);
router.get('/', productCtl.getAll);
// router.get('/:id', productCtl.getOne);


module.exports = router;