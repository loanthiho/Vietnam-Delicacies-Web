'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      category_id: {
        type: Sequelize.UUID
      },
      seller_id: {
        type: Sequelize.UUID
      },
      province_id: {
        type: Sequelize.UUID,
      },
      domain_id: Sequelize.UUID,
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      inventory: {
        type: Sequelize.INTEGER
      },
      pre_image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      star: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      likes: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      brand: {
        allowNull: true,
        type: Sequelize.STRING
      },
      new_price: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      food_safety_certification: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ingredients: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cooking_techniques: {
        allowNull: true,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      quantity_sold: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};