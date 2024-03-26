const express = require('express');
const router = express.Router();
const chatCtl = require('../controllers/chatCtl');
const { checkAuth } = require('../middleware/check-auth');

router.post('/chat', checkAuth, chatCtl.chat);
router.post('/:receiver_id', checkAuth, chatCtl.createRoom);

router.get('/get-message/:chat_id', checkAuth, chatCtl.getMessage);
router.get('/get-rooms', checkAuth, chatCtl.getChatRoom);
router.delete('/remove-room/:id', checkAuth, chatCtl.removeRoom);
router.get('/seller-get-room/:id', checkAuth, chatCtl.sellerGetRoom);


module.exports = router;