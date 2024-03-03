'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCart.belongsTo(models.Cart, {
        foreignKey: {
          name: 'cart_id',
          type: DataTypes.UUID
        }
      });

      // Mỗi record trong cart sẽ thuộc về một product nào đó.
      // Tức là khi chưa có product đó thì record đó sẽ không tồn tại và không hợp lệ.
      ProductCart.belongsTo(models.Product, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      })
    }
  }
  ProductCart.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    cart_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};