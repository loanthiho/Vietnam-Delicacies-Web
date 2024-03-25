'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, {
        foreignKey: {
          name: 'sender_id',
          type: DataTypes.UUID
        }
      });
      Chat.belongsTo(models.User, {
        foreignKey: {
          name: 'receiver_id',
          type: DataTypes.UUID
        }
      });

      Chat.hasMany(models.Message, {
        foreignKey: {
          type: DataTypes.UUID,
          name: 'chat_id'
        }
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