'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: {
          name: 'sender_id',
          type: DataTypes.UUID
        }
      });

      Message.belongsTo(models.Chat, {
        foreignKey: {
          name: 'chat_id',
        }
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    sender_id: DataTypes.UUID,
    chat_id: DataTypes.UUID,
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};