const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const uploadCtl = require('../controllers/uploadCtl');

router.post('/', upload.array("files", 10), uploadCtl.uploadFiles);
module.exports = router;