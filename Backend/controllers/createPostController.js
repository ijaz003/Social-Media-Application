const cloudinary = require("cloudinary").v2;
const postModel = require("../Models/postModel");
const userModel=require("../Models/userModel")
const jwt = require("jsonwebtoken");

const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;
        const authorization = JSON.parse(req.headers['authorization']);
        const token = jwt.verify(authorization.token, process.env.JWT_SECRET_KEY);
        const imageUpload = await cloudinary.uploader.upload(req.file.path);

        const data = await userModel.findOne({ _id: token.userId });
        const newPost = new postModel({
            imageUrl: imageUpload.secure_url,
            userId: data._id,
            caption: caption,
            name: data.name,
        });
        await newPost.save();
        res.status(200).json({ message: 'Data Enter successfully' });
        // console.log(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
    }
};

module.exports = createPostController;
