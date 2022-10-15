"use strict";

const generateSlug = require("../helpers/generateSlug");

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
    let movies = require("../db.json").movies;
    movies.forEach((movie) => {
      delete movie.id;
      movie.slug = generateSlug(movie.title);
      movie.createdAt = new Date();
      movie.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Movies", movies, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
