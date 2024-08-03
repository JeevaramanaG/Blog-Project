const express = require("express");
const mongoose = require("mongoose");
const User = require("../../model/users/User");
const bcrypt = require("bcrypt");
const userControllerRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const existUser = await User.findOne({ username });
  try {
    if (existUser) {
      return res.json({ message: "User already register" });
    }
    const salt = await  bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashPassword,
    });
    await user.save();
    return res.json({ message: "Registered Successfully" });
  } catch (error) {
    return res.json(error);
  }
};
const userControllerLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  try {
    if (user) {
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.json({ message: "Login Successfully" });
      }
    }
  } catch (error) {
    return res.json({ message: "User not exists" });
  }
};

module.exports = {
  userControllerRegister,
  userControllerLogin,
};
