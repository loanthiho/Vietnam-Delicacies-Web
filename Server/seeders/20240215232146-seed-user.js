'use strict';
const { User } = require('../models');
const { usersData } = require('./data');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await User.findAll()
      .then(result => {
        if (!result) {
          User.bulkCreate(usersData);
        }
        else {
          console.log("User already seeded!")
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
