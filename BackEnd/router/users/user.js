const express = require("express");
const {
  userControllerRegister,
  userControllerLogin,
  userControllerLogout,
  userControllerDetails,
  userControllerProfile,
  userControllerProfilePhotoUpdate,
  userControllerCoverPhotoUpdate,
  userControllerUpdatePassword,
  userControllerUpdateUser,
} = require("../../controller/users/userController");
const userRouter = express.Router();

userRouter.post("/register", userControllerRegister);
userRouter.post("/login", userControllerLogin);
userRouter.get("/:id", userControllerDetails);
userRouter.get("/profile/:id", userControllerProfile);
userRouter.put("/profile-photo-upload/:id", userControllerProfilePhotoUpdate);
userRouter.put("/cover-photo-upload/:id", userControllerCoverPhotoUpdate);
userRouter.put("/update-password/:id", userControllerUpdatePassword);
userRouter.put("/update-user/:id", userControllerUpdateUser);
userRouter.post("/logout", userControllerLogout);

module.exports = userRouter;
