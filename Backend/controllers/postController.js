const postModel = require('../Models/postModel');
const userModel=require("../Models/userModel");

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    for(let post of posts){
      let user=await userModel.findOne({_id:post.userId})
      post.profileImage=user.profileImage
      
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = getPosts;
