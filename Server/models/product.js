'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Một Category có nhiều Product.
      // Một Product chỉ thuộc một Category.
      Product.belongsTo(models.Category, {
        foreignKey: {
          name: 'category_id',
          type: DataTypes.UUID
        }
      });

      // Một product thì chỉ thuộc về một người bán.
      // Nhưng một người bán thì sẽ có thể có nhiều Product.
      // Một User có thể xuất hiện nhiều lần trong bảng Product.
      Product.belongsTo(models.User, {
        foreignKey: {
          name: 'seller_id',
          type: DataTypes.UUID,
        }
      });

      // Một product thì sẽ chỉ thuộc về một province duy nhất
      // Suy ra một một tỉnh sẽ có nhiều Product => Một province sẽ tham chiếu vào nhiều product khác nhau.
      Product.belongsTo(models.Province, {
        foreignKey: {
          name: 'province_id',
          type: DataTypes.UUID
        }
      });

      // Một Product có thể có nhiều record trong bảng file.
      // Tức là  một product có thể có nhiều hình ảnh hoặc là một.
      // -) Nhưng một file (ảnh, video) chỉ thuộc về một product duy nhất.
      Product.hasMany(models.File, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID,
          allowNull: true
        }
      });

      // Một product có thể có nhiều record trong bảng ProducWishlist
      Product.hasMany(models.ProductWishlist, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      });

      // Một product có thể có nhiều record trong bảng productCart.
      Product.hasMany(models.ProductCart, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      });
      Product.hasMany(models.Review, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      });

      Product.hasMany(models.OrderDetail, {
        foreignKey: {
          name: 'product_id',
          type: DataTypes.UUID
        }
      })

      // Một sản phẩm có thể có ở shopping cart của nhiều người dùng.
      // Một shopping cart có thể có nhiều sản phẩm.
      Product.belongsToMany(models.Cart, {
        through: models.ProductCart
      });

      // Một product có thể có trong nhiều wishlist của nhiều người dùng.
      // Một wishlist có thể có nhiều product.
      Product.belongsToMany(models.Wishlist, {
        through: models.ProductWishlist
      });
    }
  }
  Product.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    province_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    domain_id: {
      type: DataTypes.UUID,
      allowNull:true
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    new_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pre_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    star: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },

    food_safety_certification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cooking_techniques: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};