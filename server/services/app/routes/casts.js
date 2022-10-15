const express = require("express");
const router = express.Router();
const castController = require("../controllers/castController");

router.get("/", castController.getAllCast);

module.exports = router;
