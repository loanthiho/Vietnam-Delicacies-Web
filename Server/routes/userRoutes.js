const express = require('express');
const Router = express.Router();
const userCtl = require('../controllers/userCtl');

Router.post('/sign-up', userCtl.signUp)
Router.post('/sign-in', userCtl.signIn)
Router.post('/sign-in', userCtl.signIn)
// Router.post('/',userCtl.create);
Router.get('/', userCtl.getAll);
Router.get('/by-email/:email', userCtl.getOneByEmail);
// Router.patch('/:id',userCtl.update);
// Router.delete('/:id',userCtl.remove);

module.exports = Router;