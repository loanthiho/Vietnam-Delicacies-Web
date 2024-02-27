const express = require('express');
const router = express.Router();
const categoryCtl = require('../controllers/categoryCtl');


router.post('/',categoryCtl.save); 
router.get('/', categoryCtl.getAll)

module.exports = router;