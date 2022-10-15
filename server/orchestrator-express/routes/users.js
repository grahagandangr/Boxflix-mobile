const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUser);
router.post("/", userController.postUser);
router.get("/:_id", userController.getUserById);
router.delete("/:_id", userController.deleteUser);

module.exports = router;
