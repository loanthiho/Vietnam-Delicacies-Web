const { Op, where } = require('sequelize');
const { Chat, User, Message } = require('../models');
const { resBadRequest, resSuccess, resSuccessData, resInternalError } = require('../utils/response');
const createNewRoomChat = async (req, res, next) => {
    const sender_id = req.userData.id;
    const receiver_id = req.params.receiver_id;
    /**
     * @fetchRoomChat
     * To check if the room has already exist it will not created anymore!
     */
    if (!sender_id || !receiver_id) {
        return resBadRequest(res, "Missing receiver_id or sender_id");
    };
    const fetchRoomChat = await Chat.findAll({
        where: {
            [Op.or]: [
                { sender_id: current_user_id },
                { receiver_id: current_user_id }
            ],
        },
        include: [{ model: Message }, { model: User }],
        order: [[Message, "date", "DESC"]]
    });
    if (fetchRoomChat && fetchRoomChat.length > 0) {
        return resSuccessData(res, fetchRoomChat, "This room have already created!");
    }
    /**
     * Check is valid user in database.
     */
    const isValidSender = await User.findOne({ where: { id: sender_id } });
    const isValidReceiver = await User.findOne({ where: { id: receiver_id } });
    if (!isValidReceiver || !isValidSender) {
        return resBadRequest(res, "Thông tin người dùng không chính xác!")
    }
    try {
        const createRoomChat = await Chat.create({ sender_id, receiver_id });
        // const createRoom = await Chat.create({ sender_id: receiver_id, receiver_id: sender_id });
        if (createRoomChat) {
            const chatRoom = await Chat.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: createRoomChat.sender_id },
                        { receiver_id: createRoomChat.receiver_id }
                    ],
                },
                include: [{ model: Message }, { model: User }],
                order: [[Message, "date", "DESC"]]
            });
            // return resSuccessData(res, chatRoom);
            return resSuccessData(res, chatRoom, "Create room chat successfully!")
        }
    } catch (error) {
        return resInternalError(res, error);
    }
};

const chatting = async (req, res, next) => {
    const sender_id = req.userData.id;
    const { chat_id, message, date } = req.body;
    if (!chat_id || !sender_id || !message) {
        return resBadRequest(res, "You are missing field to insert into db!");
    }
    const isValidChatRoom = await Chat.findByPk(chat_id);
    if (!isValidChatRoom) {
        return resBadRequest(res, "The chat room can not found!");
    }
    const isValidUser = await User.findByPk(sender_id);
    if (!isValidUser) {
        return resBadRequest(res, "The user is not found!");
    }
    const messageToDb = {
        chat_id: chat_id,
        sender_id: sender_id,
        date: date || new Date(),
        message: message
    };
    const chatting = await Message.create(messageToDb);
    if (chatting) {
        return resSuccessData(res, chatting, "Messages chat successfully!");
    }
    return resInternalError(res, "Send message faild!");
}

const getAllChatRoom = async (req, res, next) => {
    try {
        const current_user_id = req.userData.id;
        const chatRoom = await Chat.findAll({
            where: {
                [Op.or]: [
                    { sender_id: current_user_id },
                    { receiver_id: current_user_id }
                ],
            },
            include: [
                { model: Message },
                { model: User, as: "Receiver" },
                { model: User, as: "Sender" }
            ],
            order: [[Message, "date", "DESC"]]
        });
        return resSuccessData(res, chatRoom);
    } catch (error) {
        // return resInternalError(res, error);
        console.log(error)
    }
}

const getMessInChatRoom = async (req, res, next) => {
    const chat_id = req.params.chat_id;
    if (!chat_id) {
        return resBadRequest(res, "You missing chat_id of room chat!");
    }
    const isValidChatRoom = Chat.findByPk(chat_id);
    if (!isValidChatRoom) {
        return resBadRequest(res, "Chat room not found!");
    }
    const messagesInRoom = await Message.findAll({ where: { chat_id: chat_id } });
    if (!messagesInRoom) {
        return resInternalError(res, "Get message not faild");
    }
    return resSuccessData(res, messagesInRoom, "Get all messages successfully!");
};

const removeRoomChat = async (req, res, next) => {
    const chat_id = req.params.id;
    const user_id = req.userData.id;
    var isSuccess = true;
    if (!chat_id) {
        return resBadRequest(res, "Missing chat id!");
    }
    const isValidRoom = await Chat.findByPk(chat_id);
    const isValidUser = await Chat.findOne({
        where: {
            [Op.or]: [
                { sender_id: user_id },
                { receiver_id: user_id }
            ],
        }
    });
    if (!isValidRoom || !isValidUser) {
        return resBadRequest(res, "no room or no user id match!")
    }
    const messagesInRoom = await Message.findAll({ where: { chat_id: chat_id } });
    for (const message of messagesInRoom) {
        try {
            await Message.destroy({ where: { id: message.id } });
        } catch (error) {
            isSuccess = false;
            return resInternalError(res, "Delete messages error", error);
        }
    }
    if (isSuccess) {
        try {
            const removeRoomChat = await Chat.destroy({ where: { id: chat_id } });
            if (removeRoomChat) {
                return resSuccess(rs, "Remove room chat successfull");
            }
        } catch (error) {
            return resInternalError(res, "Error remove room chat!")
        }
    }
}
module.exports = {
    createNewRoomChat,
    chatting,
    getAllChatRoom,
    getMessInChatRoom,
    removeRoomChat
}