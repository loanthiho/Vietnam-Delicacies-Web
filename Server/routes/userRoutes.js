const express = require('express');
const Router = express.Router();
const userCtl = require('../controllers/userCtl');

Router.post('/sign-up', userCtl.signUp)
Router.post('/sign-in', userCtl.signIn)
// Router.post('/sign-in', userCtl.signIn)
// Router.post('/',userCtl.create);
Router.get('/by-email/:email', userCtl.getOneByEmail);
Router.get('/:id', userCtl.getOneById);
Router.get('/', userCtl.getAll);
Router.patch('/:id', userCtl.update);

Router.post('/forgot-password', userCtl.fogotPassword);
Router.post('/change-password', userCtl.changePass);
// Router.patch('/:id',userCtl.update);
// Router.delete('/:id',userCtl.remove);

module.exports = Router;