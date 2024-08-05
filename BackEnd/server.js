require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const userRouter = require("./router/users/user");
const postRouter = require("./router/posts/post");
const commentRouter = require("./router/comments/comment");
const globalErrHandler = require("./middleware/globalErrorHandler");
require("./config/dbConnect");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "Jeeva",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);

// Global Error Handler
app.use(globalErrHandler);

// Server
const PORT = process.env.PORT || 2513;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
