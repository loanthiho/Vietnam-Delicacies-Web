'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Domain.hasMany(models.Product, {
        foreignKey: {
          name: 'domain_id',
          type: DataTypes.UUID
        }
      });
      Domain.hasMany(models.User, {
        foreignKey: {
          name: "domain_id",
          type: DataTypes.UUID,
          allowNull: true
        }
      });
    }
  }
  Domain.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Domain',
  });
  return Domain;
};