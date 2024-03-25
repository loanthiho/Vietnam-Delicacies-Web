const express = require('express');
const Router = express.Router();
const userCtl = require('../controllers/userCtl');

Router.post('/sign-up', userCtl.signUp)
Router.post('/sign-in', userCtl.signIn)
// Router.post('/sign-in', userCtl.signIn)
// Router.post('/',userCtl.create);
Router.get('/', userCtl.getAll);
Router.get('/:id', userCtl.getOneById);
Router.patch('/:id', userCtl.update);

Router.get('/by-email/:email', userCtl.getOneByEmail);
Router.post('/forgot-password', userCtl.fogotPassword);
Router.post('/change-password', userCtl.changePass);
// Router.patch('/:id',userCtl.update);
// Router.delete('/:id',userCtl.remove);

module.exports = Router;