const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/dbConnect");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2513;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
