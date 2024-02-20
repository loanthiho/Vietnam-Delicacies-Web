'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      District.belongsTo(models.Province,{
        foreignKey:{
          name:'province_id',
          type:DataTypes.UUID
        }
      });
      District.hasMany(models.Ward, {
        foreignKey:{
          name:'district_id',
          type:DataTypes.UUID
        }
      });
    }
  }
  District.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    province_id: {
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};