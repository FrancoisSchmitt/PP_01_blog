const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");

route.post("/auth/UserRegister", authController.CreateUser);
route.post("/auth/UserLogin", authController.UserLogin);
route.get("/auth/User", authController.User);

module.exports = route;
