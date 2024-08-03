const express = require("express");

const postControllerCreate = async (req, res) => {
  try {
    return res.json({ message: "post created" });
  } catch (error) {
    return res.json(error);
  }
};

const postControllerFetchPosts = async (req, res) => {
  try {
    return res.json({ message: "fetch posts" });
  } catch (error) {
    return res.json(error);
  }
};
const postControllerFetchOnePost = async (req, res) => {
  try {
    return res.json({ message: "fetch one post" });
  } catch (error) {
    return res.json(error);
  }
};
const postControllerUpdatePost = async (req, res) => {
  try {
    return res.json({ message: "Update post" });
  } catch (error) {
    return res.json(error);
  }
};
const postControllerDeletePost = async (req, res) => {
  try {
    return res.json({ message: "delete posts" });
  } catch (error) {
    return res.json(error);
  }
};
module.exports = {
  postControllerCreate,
  postControllerFetchPosts,
  postControllerFetchOnePost,
  postControllerUpdatePost,
  postControllerDeletePost,
};
