import Post from "../models/post.js";

import mongoose from "mongoose";

const searchPost = async (req, res, next) => {
  try {
    const postName = req.params.name;
    // Find the post by name
    const post = await Post.findOne({ name: postName });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.log("An error occurred retrieving the post:", error);
    res.status(500).json({ error: error });
  }
};

// show all posts
const searchUserMessage = async (req, res, next) => {};

export const searchController = {
  searchPost,
};
