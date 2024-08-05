const cloudinary = require("cloudinary").v2;

const { cloudinaryStorage } = require("multer-storage-cloudinary");

//config cloudinary
cloudinary.config({
  cloud_name: dhi4ofsof,
  api_key: 485637683996985,
  api_secret: IBxHIl5PrlT74BkKKh5Kk0Wv4s,
});

const storage = new cloudinaryStorage({
  cloudinary,
  allowedFormat: ["jpg", "jpeg", "png"],
  params: {
    folder: "myFolder",
    Transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
