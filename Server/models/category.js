'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey:{
          name:'category_id',
          type:DataTypes.UUID
        }
      })
    }
  }
  Category.init({
    id:{
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
    },
    name:{
      type:DataTypes.STRING,
      unique:true
    } 
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};