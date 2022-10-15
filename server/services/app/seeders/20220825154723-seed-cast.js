"use strict";

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
    let casts = require("../db.json").casts;
    casts.forEach((cast) => {
      delete cast.id;
      cast.createdAt = new Date();
      cast.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Casts", casts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Casts", null, {});
  },
};
