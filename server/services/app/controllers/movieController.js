const { Movie, Cast, Genre, sequelize } = require("../models");
const generateSlug = require("../helpers/generateSlug");

class MovieController {
  static async getAllMovie(req, res, next) {
    try {
      const movies = await Movie.findAll({ order: [["id", "ASC"]], include: [Cast, Genre] });
      res.status(200).json(movies);
    } catch (err) {
      next(err);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id, { include: [Cast, Genre] });
      console.log(movie);

      if (!movie) {
        throw { name: "NotFound" };
      }

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async postAddMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // const authorId = req.user.id;
      const {
        title,
        synopsis,
        trailerUrl,
        posterImgUrl,
        backdropImgUrl,
        rating,
        genreId,
        cast1Name,
        cast1Character,
        cast1ProfilePict,
        cast2Name,
        cast2Character,
        cast2ProfilePict,
        UserMongoId,
      } = req.body;

      const newMovie = await Movie.create(
        {
          title,
          synopsis,
          trailerUrl,
          posterImgUrl,
          backdropImgUrl,
          rating: +rating,
          genreId,
          UserMongoId,
        },
        { transaction: t }
      );

      const casts = [
        {
          name: cast1Name,
          character: cast1Character,
          profilePict: cast1ProfilePict,
          movieId: newMovie.id,
        },
        {
          name: cast2Name,
          character: cast2Character,
          profilePict: cast2ProfilePict,
          movieId: newMovie.id,
        },
      ];

      await Cast.bulkCreate(casts, { transaction: t });
      await t.commit();

      res.status(201).json({ data: newMovie, message: `Success to add movie ${newMovie.title} and casts` });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;
      const castForDelete = await Cast.findAll({ where: { movieId: id }, transaction: t });

      if (castForDelete.length < 0) {
        throw { name: "NotFound" };
      }

      await Cast.destroy({ where: { movieId: id }, transaction: t });

      const movieForDelete = await Movie.findByPk(id, { transaction: t });

      if (!movieForDelete) {
        throw { name: "NotFound" };
      }

      await Movie.destroy({
        where: { id },
        transaction: t,
      });

      const messageSuccess = `Success to delete ${movieForDelete.title} and casts`;

      await t.commit();

      res.status(200).json({ data: movieForDelete, message: messageSuccess });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async putMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { title, synopsis, trailerUrl, posterImgUrl, backdropImgUrl, rating, genreId, UserMongoId } = req.body;

      const slug = generateSlug(title);

      const movieForUpdate = await Movie.findByPk(id);

      if (!movieForUpdate) {
        throw { name: "NotFound" };
      }

      await Movie.update(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          posterImgUrl,
          backdropImgUrl,
          rating,
          genreId,
          UserMongoId,
        },
        {
          where: { id },
        }
      );

      res.status(201).json({ message: "Success to update movie" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;
