const express = require("express");
const mongoose = require("mongoose");
const User = require("../../model/users/User");
const bcrypt = require("bcrypt");
const appErr = require("../../utils/appErr");
const userControllerRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existUser = await User.findOne({ username });
  try {
    if (existUser) {
      return next(appErr("User already register"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.json({ message: "Registered Successfully", user });
  } catch (error) {
    return res.json(error);
  }
};

const userControllerLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.json({ message: "User not exists" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.json({ message: "Invalid Password" });
  }
  req.session.userAuth = user._id;
  return res.json(user);
};

const userControllerLogout = async (req, res) => {
  try {
    return res.json({ message: "Logout" });
  } catch (error) {
    return res.json(error);
  }
};

const userControllerDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
};
const userControllerProfile = async (req, res) => {
  try {
    return res.json({ message: "Profile" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerProfilePhotoUpdate = async (req, res) => {
  console.log(req.file.path);
  const userId = req.session.userAuth;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    res.status(404).json({ message: "user Not found" });
  }
  await User.findByIdAndUpdate(
    userId,
    {
      profileImage: req.file.path,
    },
    {
      new: true,
    }
  );

  try {
    return res.json(foundUser);
  } catch (error) {
    return res.json(error);
  }
};
const userControllerCoverPhotoUpdate = async (req, res) => {
  console.log(req.file.path);
  const userId = req.session.userAuth;
  const userFound = await User.findById(userId);
  if (!userFound) {
    res.status(404).json({ message: "user Not found" });
  }
  await User.findByIdAndUpdate(
    userId,
    {
      coverImage: req.file.path,
    },
    { new: true }
  );
  try {
    return res.json({ message: "CoverphotoUpload" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerUpdatePassword = async (req, res) => {
  const { password } = req.body;

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.params.id, {
        password: hashedPassword,
      });
    }
    const updatedUser = await User.findById(req.params.id);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userControllerUpdateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const emailtaken = await User.findOne({ email });
    if (emailtaken) {
      return res.json({ message: "Email already taken" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(user);
  } catch (error) {
    return res.json(appErr("Internal server error", 500));
  }
};

module.exports = {
  userControllerRegister,
  userControllerLogin,
  userControllerLogout,
  userControllerDetails,
  userControllerProfile,
  userControllerProfilePhotoUpdate,
  userControllerCoverPhotoUpdate,
  userControllerUpdatePassword,
  userControllerUpdateUser,
};
