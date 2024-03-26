'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, {
        foreignKey: 'sender_id', // Tên trường khóa ngoại
        as: 'Sender' // Tên bí danh cho mối quan hệ với người gửi
      });
      Chat.belongsTo(models.User, {
        foreignKey: 'receiver_id', // Tên trường khóa ngoại
        as: 'Receiver' // Tên bí danh cho mối quan hệ với người nhận
      });
      Chat.hasMany(models.Message, {
        foreignKey: 'chat_id', // Tên trường khóa ngoại
      });
    }
  }
  Chat.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sender_id: DataTypes.UUID,
    receiver_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};