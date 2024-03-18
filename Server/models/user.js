'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Một người bán có thể bán nhiều sản phẩm.
      // Mỗi Product chỉ được bán ra bởi một người.
      User.hasMany(models.Product, {
        foreignKey: {
          name: 'seller_id',
          type: DataTypes.UUID
        },
      });

      // Một Province sẽ gồm nhiều User.
      // Một User chỉ thuộc về một tỉnh duy nhất.

      User.belongsTo(models.Province, {
        foreignKey: {
          name: 'province_id',
          type: DataTypes.UUID,
          allowNull: true,
        }
      });

      User.belongsTo(models.Domain, {
        foreignKey: {
          name: 'domain_id',
          type: DataTypes.UUID,
          allowNull: true
        }
      })

      // Một User chỉ có một shopping cart duy nhất.
      // Một shopping cart chỉ thuộc quyền sở hữu của một người.
      // Một record trong bảng cart sẽ có một unique User.
      User.hasOne(models.Cart, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });

      // Một user chỉ có một wishlist.
      // Một wishlist sẽ chỉ thuộc về một User.
      User.hasOne(models.Wishlist, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });

      // Một user có thế có nhiều comment hoặc đăng tải ảnh về một sản phẩm nào đó. 
      // Một User có thể có nhiều review. But một review chỉ thuộc về duy nhất một người.jnn `  
      User.hasMany(models.Review, {
        foreignKey: {
          name: 'user_id',
          type: DataTypes.UUID
        }
      });

      User.hasMany(models.Order, {
        foreignKey: {
          name: 'customer_id',
          type: DataTypes.UUID
        }
      });

      User.hasMany(models.OrderDetail, {
        foreignKey: {
          name: 'seller_id',
          type: DataTypes.UUID
        }
      })
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    province_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    domain_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    detail_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};