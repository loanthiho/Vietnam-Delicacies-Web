'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductWishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductWishlist.belongsTo(models.Product, {
        foreignKey: {
          name: "product_id",
          type: DataTypes.UUID,
        }
      });
      ProductWishlist.belongsTo(models.Wishlist, {
        foreignKey: {
          name: "wishlist_id",
          type: DataTypes.UUID
        }
      })
    }
  }
  ProductWishlist.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    wishlist_id: DataTypes.UUID,
    product_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductWishlist',
  });
  return ProductWishlist;
};