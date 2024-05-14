import Post from "../models/post.js";

import mongoose from "mongoose";
import User from "../models/users.js";

const likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    //check if the user has already liked the post
    const existingLike = post?.likes.find(
      (like) => like.user.toString() === userId
    );

    if (existingLike) {
      post.likes = post.likes.filter((like) => like.user.toString() !== userId);
    } else {
      post.likes.push({ user: userId });
    }

    await post.save();

    res.status(200).json({ message: "Post like/unlike successfull", post });
  } catch (error) {
    console.log("error likeing a post", error);
    res.status(500).json({ message: "Error liking the post" });
  }
};

// show all posts
const updateDescription = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const { description } = req.body;

    // Kiểm tra xem bài viết có thuộc về userId không
    const post = await Post.findOne({ _id: postId, user: userId });

    if (!post) {
      // Nếu không tìm thấy bài viết của người dùng, trả về lỗi
      return res
        .status(404)
        .json({ message: "Cannot update post of another user" });
    }

    // Thực hiện cập nhật mô tả của người dùng và kiểm tra xem cập nhật có thành công hay không
    const updatedUser = await Post.findByIdAndUpdate(postId, {
      description,
    });

    if (!updatedUser) {
      // Nếu không tìm thấy người dùng, trả về lỗi
      return res.status(404).json({ message: "User not found" });
    }

    // Nếu cập nhật thành công, trả về kết quả thành công
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error updating user Profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post delete successfully" });
  } catch (error) {
    console.log("Error delete user Profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

export const interactController = {
  likePost,
  updateDescription,
  deletePost,
};
