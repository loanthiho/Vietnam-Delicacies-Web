const express = require('express');
const router = express.Router();
const districtCtl = require('../controllers/districtCtl');

router.post('/',districtCtl.create);


module.exports = router;