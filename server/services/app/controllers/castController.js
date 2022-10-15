const { Cast, Movie } = require("../models");

class CastController {
  static async getAllCast(req, res, next) {
    try {
      const casts = await Cast.findAll({ include: [Movie] });

      res.status(200).json(casts);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CastController;
