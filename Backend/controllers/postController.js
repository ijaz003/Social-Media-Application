const postModel = require('../Models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = getPosts;
