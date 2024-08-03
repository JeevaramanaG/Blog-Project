const express = require("express");
const {
  userControllerRegister,
  userControllerLogin,
} = require("../../controller/users/userController");
const userRouter = express.Router();

userRouter.post("/api/v1/user/register", userControllerRegister);
userRouter.post("/api/v1/user/login", userControllerLogin);

module.exports = userRouter;
