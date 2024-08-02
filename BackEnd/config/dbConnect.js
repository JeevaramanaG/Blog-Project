require("dotenv").config();
const mongoose = require("mongoose");
const connect = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/Blog-project")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
connect();
