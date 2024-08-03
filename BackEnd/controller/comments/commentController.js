const express = require("express");

const commentCreate = async (req, res) => {
  try {
    return res.json({ Message: "comment" });
  } catch (error) {
    return res.json(error);
  }
};
const commentDetails = async (req, res) => {
  try {
    return res.json({ Message: "comment details" });
  } catch (error) {
    return res.json(error);
  }
};
const commentDelete = async (req, res) => {
  try {
    return res.json({ Message: "comment delete" });
  } catch (error) {
    return res.json(error);
  }
};
const commentUpdate = async (req, res) => {
  try {
    return res.json({ Message: "comment update" });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  commentCreate,
  commentDetails,
  commentDelete,
  commentUpdate,
};
