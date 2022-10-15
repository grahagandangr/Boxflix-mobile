const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllMovie);
router.post("/", movieController.postAddMovie);
router.get("/:id", movieController.getMovieById);
router.delete("/:id", movieController.deleteMovie);
router.put("/:id", movieController.putMovie);

module.exports = router;
