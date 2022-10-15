const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");
const movieController = require("../controllers/movieController");

router.get("/movies", movieController.getAllMovie);
router.get("/movies/:id", movieController.getMovieById);
router.get("/genres", genreController.getAllGenre);

module.exports = router;
