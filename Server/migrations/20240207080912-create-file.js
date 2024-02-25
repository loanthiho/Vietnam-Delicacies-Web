'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      product_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      comment_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      file_type: {
        type: Sequelize.STRING,
      },
      src: {
        type: Sequelize.STRING
      },
      file_name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Files');
  }
};