const express = require("express");

const postControllerCreate= async (res, req) => {
  try {
    return res.json({ message: "post created" });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { postControllerCreate };
