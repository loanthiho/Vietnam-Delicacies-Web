'use strict';
const { Province } = require('../models');
const { provincesData } = require('./data');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Province.findAll()
      .then(result => {
        if (result.length == 0) {
          Province.bulkCreate(provincesData);
        }
        else {
          console.log("province already seeded!")
        }
      })
      .catch(res => {
        console.log(res)
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
