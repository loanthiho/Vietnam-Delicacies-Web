const express = require('express');
const provinceCtl = require('../controllers/provinceCtl');
const Router = express.Router();

Router.post('/',provinceCtl.create);
Router.get('/',provinceCtl.getAll)


module.exports = Router;