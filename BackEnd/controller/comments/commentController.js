const express = require("express");
const Post = require("../../model/posts/Post");
const Comment = require("../../model/comments/Comment");
const User = require("../../model/users/User");

const commentCreate = async (req, res) => {
  const { message } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
    });

    post.comments.push(comment._id);
    const user = await User.findById(req.session.userAuth);
    user.comments.push(comment._id);

    await post.save();
    await user.save();

    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const commentDetails = async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate("user");
  try {
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    return res.json(comment);
  } catch (error) {
    return res.json(error);
  }
};
const commentDelete = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      res.status(404).json({ message: "comment not found" });
    }
    if (comment.id.toString() !== req.session.userAuth.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }
    await User.updateOne(
      { comments: req.params.id },
      { $pull: { comments: req.params.id } }
    );
    await Post.updateOne(
      { comments: req.params.id },
      { $pull: { comments: req.params.id } }
    );
    return res.json({ message: "comment delete successfully" });
  } catch (error) {
    return res.json(error);
  }
};
const commentUpdate = async (req, res) => {
  const { message } = req.body;
  try {
    if (comment.id.toString() !== req.session.userAuth.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment" });
    }
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        message,
      },
      { new: true }
    );
    if (!comment) {
      res.status(404).json({ message: "comment not found" });
    }
    await comment.save();
    return res.json({ Message: "comment update", comment });
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
