const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config;
// Configure Cloudinary
cloudinary.config({
  cloud_name: "dhi4ofsof",
  api_key: 485637683996985,
  api_secret: "IBxHIl5PrlT74BkKKh5Kk-0Wv4s",
});

// Create storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "myFolder",
    format: async (req, file) => "jpeg",
    allowed_formats: ["jpg", "jpeg", "png"], // Specify allowed formats
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
