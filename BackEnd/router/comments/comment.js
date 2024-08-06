const express = require("express");
const {
  commentCreate,
  commentDetails,
  commentDelete,
  commentUpdate,
} = require("../../controller/comments/commentController");
const protected =require("../../middleware/protected");
const commentRouter = express.Router();

commentRouter.post("/:id", protected,commentCreate);
commentRouter.get("/:id", protected,commentDetails);
commentRouter.delete("/:id",protected, commentDelete);
commentRouter.put("/:id", protected,commentUpdate);

module.exports = commentRouter;
