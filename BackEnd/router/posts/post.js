const express = require("express");
const {
  postControllerCreate,
  postControllerFetchPosts,
  postControllerFetchOnePost,
  postControllerUpdatePost,
  postControllerDeletePost,
} = require("../../controller/posts/postController");

const postRouter = express.Router();

postRouter.post("/", postControllerCreate);
postRouter.get("/", postControllerFetchPosts);
postRouter.get("/:id", postControllerFetchOnePost);
postRouter.put("/:id", postControllerUpdatePost);
postRouter.delete("/:id", postControllerDeletePost);

module.exports = postRouter;
