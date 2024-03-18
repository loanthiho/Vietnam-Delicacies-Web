'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: {
          name: 'order_id',
          type: DataTypes.UUID
        }
      });

      // Bảng cart dựa vào bảng product để tạo ra một record.
      // Nếu không có bảng cart thì product vẫn có thể tạo ra một cách rất bình thường.
      OrderDetail.belongsTo(models.Product, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      });

      OrderDetail.belongsTo(models.User, {
        foreignKey: {
          name: 'seller_id',
          type: DataTypes.UUID
        }
      });
    }
  }
  OrderDetail.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    seller_id: DataTypes.UUID,
    status: DataTypes.STRING,
    product_id: DataTypes.UUID,
    order_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};