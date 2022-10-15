"use strict";
const { Model } = require("sequelize");
const generateSlug = require("../helpers/generateSlug");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Slug is required" },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Synopsis is required" },
          notNull: { msg: "Synopsis is required" },
        },
      },
      trailerUrl: DataTypes.STRING,
      backdropImgUrl: DataTypes.STRING,
      posterImgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Rating is required" },
          notNull: { msg: "Rating is required" },
          min: {
            args: [1],
            msg: "Minimum rating is 1",
          },
          max: {
            args: [10],
            msg: "Maximum rating is 10",
          },
        },
      },
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      UserMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  Movie.beforeCreate((instance, options) => {
    instance.slug = generateSlug(instance.title);
  });
  Movie.beforeUpdate((instance, options) => {
    instance.slug = generateSlug(instance.title);
  });
  return Movie;
};
