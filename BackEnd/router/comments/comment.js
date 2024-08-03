const express = require("express");
const {
  commentCreate,
  commentDetails,
  commentDelete,
  commentUpdate,
} = require("../../controller/comments/commentController");

const commentRouter = express.Router();

commentRouter.post("/", commentCreate);
commentRouter.get("/:id", commentDetails);
commentRouter.delete("/:id", commentDelete);
commentRouter.put("/:id", commentUpdate);

module.exports = commentRouter;
