const express = require("express");
const User = require("../../model/users/User");
const Post = require("../../model/posts/Post");

const postControllerCreate = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const user = await User.findById(req.session.userAuth);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postControllerFetchPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(404).json({ message: "Posts not found" });
    }
    return res.status(200).json({ message: "Posts fetched successfully", posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postControllerFetchOnePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Fetched successfully", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postControllerUpdatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description, category } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (req.session.userAuth.toString() !== post.user.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this post" });
    }
    const postUpdate = await Post.findByIdAndUpdate(
      postId,
      { title, description, category },
      { new: true }
    );
    await postUpdate.save();
    return res.status(200).json({ message: "Post updated successfully", post: postUpdate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postControllerDeletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (req.session.userAuth.toString() !== post.user.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this post" });
    }
    await Post.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post has been successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postControllerCreate,
  postControllerFetchPosts,
  postControllerFetchOnePost,
  postControllerUpdatePost,
  postControllerDeletePost,
};
