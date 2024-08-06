const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const {
  postControllerCreate,
  postControllerFetchPosts,
  postControllerFetchOnePost,
  postControllerUpdatePost,
  postControllerDeletePost,
} = require("../../controller/posts/postController");
const protected = require("../../middleware/protected");
const upload = multer({ storage });
const postRouter = express.Router();

postRouter.post("/", protected, upload.single("post"), postControllerCreate);
postRouter.get("/", protected, postControllerFetchPosts);
postRouter.get("/:id", protected, postControllerFetchOnePost);
postRouter.put("/:id", protected, postControllerUpdatePost);
postRouter.delete("/:id", protected, postControllerDeletePost);

module.exports = postRouter;
