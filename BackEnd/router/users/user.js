const express = require("express");
const protect = require("../../middleware/protected");
const multer = require("multer");
const storage = require("../../config/cloudinary");

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

const upload = multer({ storage });
const userRouter = express.Router();

userRouter.post("/register", userControllerRegister);
userRouter.post("/login", userControllerLogin);

userRouter.get("/profile/:id", protect, userControllerProfile);

userRouter.put(
  "/profile-photo-upload/:id",
  protect,
  upload.single('profilePhoto'), 
  userControllerProfilePhotoUpdate
);

userRouter.put(
  "/cover-photo-upload/:id",
  protect,
  upload.single('coverPhoto'),
  userControllerCoverPhotoUpdate
);

userRouter.put("/update-password/:id", protect, userControllerUpdatePassword);
userRouter.put("/update-user/:id", protect, userControllerUpdateUser);

userRouter.post("/logout", protect, userControllerLogout);
userRouter.get("/:id", protect, userControllerDetails);

module.exports = userRouter;
