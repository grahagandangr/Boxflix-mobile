const express = require("express");
const router = express.Router();
const userRoute = require("./users")
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRoute);
router.use(errorHandler);

module.exports = router;
