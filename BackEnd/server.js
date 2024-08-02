const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Blog-project")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
connect();

const PORT = 2513;
app.listen(PORT, () => {console.log(`Server is running the port ${PORT}`);
});
