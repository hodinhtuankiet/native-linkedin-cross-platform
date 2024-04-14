import Post from "../models/post.js";

import mongoose from "mongoose";
import User from "../models/users.js";

const likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // check if the user already liked this post
    const existingLike = post?.likes.find(
      (like) => like.user.toString() === userId
    );
    if (existingLike) {
      post.likes.filter((like) => like.user.toString() !== userId);
    } else {
      post.likes.push({ user: userId });
    }

    await post.save();
    res.status(200);
  } catch (error) {
    console.log("Error like post", error);
    res.status(500).json({ message: "Like failed" }); // corrected message
  }
};

// show all posts
const updateDescription = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { userDescription } = req.body;

    await User.findByIdAndUpdate(userId, { userDescription });

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error updating user Profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

export const interactController = {
  likePost,
  updateDescription,
};
