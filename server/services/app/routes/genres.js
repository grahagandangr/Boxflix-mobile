const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getAllGenre);
router.post("/", genreController.postAddGenre);
router.delete("/:id", genreController.deleteGenre);
router.put("/:id", genreController.putGenre);

module.exports = router;
