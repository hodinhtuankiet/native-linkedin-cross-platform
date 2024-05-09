import Post from "../models/post.js";
import mongoose from "mongoose";
import User from "../models/users.js";

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

const showAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "name profileImage");

    res.status(200).json({ posts });
  } catch (error) {
    console.log("An error occurred retrieving posts:", error);
    res.status(500).json({ error: error });
  }
};

const createNewCommentPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const { text } = req.body; // Assuming the comment text is provided in the request body

    // First, you should check if the post and user exist
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or user not found" });
    }

    const comment = {
      user: userId, // Assign the user ID to the comment
      text: text,
    };

    post.comments.push(comment);
    await post.save();

    // Optionally, you might want to update the user's activity (like "last commented" timestamp)
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postController = {
  createNewPost,
  showAllPosts,
  createNewCommentPost,
};
