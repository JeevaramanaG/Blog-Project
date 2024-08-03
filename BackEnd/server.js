const express = require("express");
const cors = require("cors");
const userRouter = require("./router/users/user");
const postRouter = require("./router/posts/post");
require("dotenv").config();
require("./config/dbConnect");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
const PORT = process.env.PORT || 2513;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
