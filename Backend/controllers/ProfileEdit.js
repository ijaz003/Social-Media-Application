const userModel = require("../Models/userModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const ProfileEdit = async (req, res) => {
  try {
    // Extract and verify the token
    const authorization = JSON.parse(req.headers['authorization']);
    const token = jwt.verify(authorization.token, process.env.JWT_SECRET_KEY);

    // Check if a file is provided for upload
    let profileImage;
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path);
      profileImage = imageUpload.secure_url;
    }

    // Extract bio and name from request body
    const { bio, name } = req.body;

    // Prepare the update data
    const updateData = { name, bio };
    if (profileImage) updateData.profileImage = profileImage;

    // Update the user's profile
    const data = await userModel.updateMany(
      { _id: token.userId },
      updateData
    );

    // Send response
    res.status(200).send({message:"Profile update successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating profile", error });
  }
};

module.exports = ProfileEdit;
