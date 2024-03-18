'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: {
          name: 'customer_id',
          type: DataTypes.UUID
        }
      });

      Order.hasMany(models.OrderDetail, {
        foreignKey: {
          name: 'order_id',
          type: DataTypes.UUID
        }
      });
    }
  }
  Order.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    customer_id: DataTypes.UUID,
    order_date: DataTypes.DATE,
    payment_method: DataTypes.STRING,
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};