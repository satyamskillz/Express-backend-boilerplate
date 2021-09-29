var authController = require("../controllers/auth");
var userController = require("../controllers/user");
var express = require("express");
var router = express.Router();

// Register user api
router.get("/v1/register", authController.register);

// Login user api
router.get("/v1/login", authController.login);

// Relogin user api
// This api check weather existed user is vaild or not.
router.get("/v1/relogin", authController.relogin);

module.exports = router;
