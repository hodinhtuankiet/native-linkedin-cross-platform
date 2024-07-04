import Post from "../models/post.js";

import mongoose from "mongoose";
import User from "../models/users.js";

const searchPost = async (req, res) => {
  try {
    // Find the post by description or user name
    const { description, name } = req.body;
    const post = await Post.findOne({
      $or: [{ description: description }, { "user.name": name }],
    });
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
