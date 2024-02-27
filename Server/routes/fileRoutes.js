const express = require('express');
const router = express.Router();
const fileCtl = require('../controllers/fileCtl');
const upload = require('../middleware/multer');
router.patch('/:id', upload.array('files', 10), fileCtl.edit);



module.exports = router;