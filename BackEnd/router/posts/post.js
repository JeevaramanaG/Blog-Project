const express=require("express");
const {postControllerCreate } = require("../../controller/posts/postController");

const postRouter=express.Router();


postRouter.post("/api/v1/post",postControllerCreate);