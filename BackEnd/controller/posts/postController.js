const express = require("express");
const User = require("../../model/users/User");
const Post = require("../../model/posts/Post");
const postControllerCreate = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const user = await User.findById(req.session.userAuth);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = new Post({
      title,
      description,
      category,
      image: req.file.path,
      user: req.session.userAuth,
    });
    await post.save();
    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({ message: "Post created successfully", post });
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
