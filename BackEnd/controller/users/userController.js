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
  return res.json({ message: "Login Successfully", user });
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
    return res.json({ message: "details" });
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
  try {
    return res.json({ message: "ProfilePhotoUpload" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerCoverPhotoUpdate = async (req, res) => {
  try {
    return res.json({ message: "CoverphotoUpload" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerUpdatePassword = async (req, res) => {
  try {
    return res.json({ message: "UpdatePassword" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerUpdateUser = async (req, res) => {
  try {
    return res.json({ message: "UpdateUser" });
  } catch (error) {
    return res.json(error);
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
