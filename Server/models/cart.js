'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });

      Cart.hasMany(models.ProductCart,{
        foreignKey:{
          name:'cart_id',
          type:DataTypes.UUID
        }
      });

      Cart.belongsToMany(models.Product, {
        through: models.ProductCart
      }); 
    }
  }
  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};