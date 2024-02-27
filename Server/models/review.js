'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });
      Review.belongsTo(models.Product, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      });
      Review.hasMany(models.File, {
        foreignKey: {
          name: 'comment_id',
          type: DataTypes.UUID,
          allowNull:true
        }
      })
    }
  }
  Review.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comment_date: DataTypes.DATE,
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};