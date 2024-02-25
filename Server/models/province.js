'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
      Province.hasMany(models.User, {
        foreignKey: {
          name: "province_id",
          type: DataTypes.UUID,
          allowNull: true
        }
      });
      Province.hasMany(models.Product, {
        foreignKey: {
          name: 'province_id',
          type: DataTypes.UUID
        }
      })
    }
  }
  Province.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};