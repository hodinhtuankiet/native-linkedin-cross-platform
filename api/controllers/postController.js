import Post from "../models/post.js";

const createNewPost = async (req, res, next) => {
  try {
    const [description, imageUrl, userId] = req;
    const newPost = new Post({
      description: description,
      imageUrl: imageUrl,
      user: userId,
    });
    await newPost.save();
  } catch (error) {
    console.log("An error occurred creating new post");
    res.status(500).json({ error: error });
  }
};
// show all posts
const showAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "name profileImage");
  } catch (error) {
    console.log("An error occurred creating new post");
    res.status(500).json({ error: error });
  }
};

export const postController = {
  createNewPost,
  showAllPosts,
};
