const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const moviesRoute = require("./movies");
const genresRoute = require("./genres");
const castsRoute = require("./casts");
const pubRoute = require("./pub");

router.use("/movies", moviesRoute);
router.use("/genres", genresRoute);
router.use("/casts", castsRoute);
router.use("/pub", pubRoute);
router.use(errorHandler);

module.exports = router;
