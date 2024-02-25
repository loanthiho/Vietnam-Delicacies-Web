const express = require('express');
const router = express.Router();
const domainCtl = require('../controllers/domainCtl');

router.post('/', domainCtl.create);
router.get('/', domainCtl.getAll);
router.delete('/:id', domainCtl.remove)


module.exports = router;