'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.Product, {
        foreignKey: {
          type: DataTypes.UUID,
          name: 'product_id',
          allowNull: true
        }
      }),
        File.belongsTo(models.Review, {
          foreignKey: {
            name: 'comment_id',
            type: DataTypes.UUID,
            allowNull: true
          }
        })
    }
  }
  File.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    product_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    comment_id: {
      allowNull: true,
      type: DataTypes.UUID
    },
    file_type: {
      type: DataTypes.STRING,
    },
    src: DataTypes.STRING,
    file_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};