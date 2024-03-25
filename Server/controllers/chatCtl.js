const { createNewRoomChat, chatting, getAllChatRoom, getMessInChatRoom } = require('../services/chatServices');

const createRoom = (req, res, next) => createNewRoomChat(req, res, next);

const chat = (req, res, next) => chatting(req, res, next);
const getChatRoom = (req, res, next) => getAllChatRoom(req, res, next);
const getMessage = (req, res, next) => getMessInChatRoom(req, res, next);
module.exports = { createRoom, chat, getChatRoom, getMessage }