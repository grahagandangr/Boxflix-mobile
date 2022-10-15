const redis = require("../config/redisConnection");
const axios = require("axios");
const moviesBaseUrl = "http://localhost:4002";
const usersBaseUrl = "http://localhost:4001";

class MovieController {
  static async getAllMovie(req, res) {
    try {
      const moviesCache = await redis.get("app:movies");
      
      if (moviesCache) {
        console.log("dari cache");
        return res.status(200).json(JSON.parse(moviesCache));
      } else {
        console.log("dari axios");
        const { data: movies } = await axios.get(`${moviesBaseUrl}/movies`);
        await redis.set("app:movies", JSON.stringify(movies));
        return res.status(200).json(movies);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movieCache = await redis.get(`app:movies:${id}`);
      if (movieCache) {
        console.log("dari cache");
        return res.status(200).json(JSON.parse(movieCache));
      } else {
        console.log("dari axios");
        const { data: movie, status } = await axios.get(`${moviesBaseUrl}/movies/${id}`);

        const { data: user } = await axios.get(`${usersBaseUrl}/users/${movie.UserMongoId}`);
        movie.User = user;

        await redis.set(`app:movies:${id}`, JSON.stringify(movie));
        return res.status(status).json(movie);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async postAddMovie(req, res) {
    try {
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

      const { data, status } = await axios.post(`${moviesBaseUrl}/movies`, {
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
      });
      await redis.del("app:movies");
      return res.status(status).json({ message: data.message });
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const { data, status } = await axios.delete(`${moviesBaseUrl}/movies/${id}`);

      const movieCache = await redis.get(`app:movies`);

      if (movieCache) {
        const newMovies = JSON.parse(movieCache).filter((movie) => movie.id != id);
        await redis.set("app:movies", JSON.stringify(newMovies));
      }
      return res.status(status).json({ message: data.message });
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async putMovie(req, res) {
    try {
      const { id } = req.params;

      const { title, synopsis, trailerUrl, posterImgUrl, backdropImgUrl, rating, genreId, UserMongoId } = req.body;

      const { data, status } = await axios.put(`${moviesBaseUrl}/movies/${id}`, {
        title,
        synopsis,
        trailerUrl,
        posterImgUrl,
        backdropImgUrl,
        rating,
        genreId,
        UserMongoId,
      });

      await redis.del("app:movies");
      await redis.del(`app:movies:${id}`);
      return res.status(status).json({ message: data.message });
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = MovieController;
