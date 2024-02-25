'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });

      Wishlist.hasMany(models.ProductWishlist, {
        foreignKey: {
          name: 'wishlist_id',
          type: DataTypes.UUID
        }
      });

      Wishlist.belongsToMany(models.Product, {
        through: models.ProductWishlist
      });
    }
  }
  Wishlist.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};