const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");

route.post("/auth/UserCreate", authController.CreateUser);
route.post("/auth/UserLogin", authController.UserLogin);

module.exports = route;
