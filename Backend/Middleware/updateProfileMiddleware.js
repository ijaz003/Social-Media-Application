const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_key,
    api_secret: process.env.api_secret
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile",
        allowedFormats: ['jpg', 'png', 'jpeg']
    }
})

const upload = multer({ storage: storage });
module.exports = upload;