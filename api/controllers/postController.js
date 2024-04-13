import Post from "../models/post.js";

import mongoose from "mongoose";

const createNewPost = async (req, res, next) => {
  try {
    const { description, imageUrl, userId } = req.body;

    // Validate userId to ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const newPost = new Post({
      description: description,
      imageUrl: imageUrl,
      user: userId,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.log("Error creating the post", error);
    res.status(500).json({ message: "Error creating the post" });
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
