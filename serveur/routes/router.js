const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");

route.post("/auth/userLogin", authController.CreateUser);

module.exports = route;
