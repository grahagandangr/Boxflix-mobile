const dateFormatter = require("../helpers/dateFormatter");
const { Genre } = require("../models");

class GenreController {
  static async getAllGenre(req, res, next) {
    try {
      const genres = await Genre.findAll();
      const formattedGenre = genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
          createdAt: dateFormatter(genre.createdAt),
          updatedAt: dateFormatter(genre.updatedAt),
        };
      });
      res.status(200).json(formattedGenre);
    } catch (err) {
      next(err);
    }
  }
  static async postAddGenre(req, res, next) {
    try {
      const { name } = req.body;

      const newGenre = await Genre.create({
        name,
      });

      res.status(201).json({ data: newGenre, message: "Success to add genre" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;

      const genreForDelete = await Genre.findByPk(id);

      if (!genreForDelete) {
        throw { name: "NotFound" };
      }

      await Genre.destroy({
        where: { id },
      });

      const messageSuccess = `Success to delete ${genreForDelete.name}`;

      res.status(200).json({ data: genreForDelete, message: messageSuccess });
    } catch (err) {
      next(err);
    }
  }

  static async putGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const genreForUpdate = await Genre.findByPk(id);

      if (!genreForUpdate) {
        throw { name: "NotFound" };
      }

      await Genre.update(
        {
          name,
        },
        {
          where: { id },
        }
      );

      res.status(201).json({ message: "Success to update" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GenreController;
