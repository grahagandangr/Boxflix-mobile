const express = require("express");
const router = express.Router();
const userRoute = require("./users");
const movieRoute = require("./movies");

router.use("/users", userRoute);
router.use("/movies", movieRoute);

module.exports = router;
