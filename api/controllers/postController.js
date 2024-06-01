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
const showAllComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Find the post by ID and populate the comments with user information
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "user", select: "name text profileImage" },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Extract comments from the post
    const comments = post.comments;

    res.status(200).json({ comments });
  } catch (error) {
    console.log("An error occurred retrieving comments:", error);
    res.status(500).json({ error: error });
  }
};

const createNewCommentPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const { description } = req.body; // Assuming the comment text is provided in the request body

    // First, you should check if the post and user exist
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or user not found" });
    }

    const comment = {
      user: userId, // Assign the user ID to the comment
      text: description,
      name: user.name, // Add user's name to the comment
      profileImage: user.profileImage, // Add user's profile image to the comment
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
const replyCommentPost = async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const userId = req.params.userId;

  const { description } = req.body;

  try {
    // Tìm bài viết
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Tìm comment trong bài viết
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Tạo replyComment
    const replyComment = {
      user: userId, // Gán ID của người dùng vào comment
      text: description,
      name: user.name, // Thêm tên người dùng vào comment
      profileImage: user.profileImage, // Thêm ảnh đại diện của người dùng vào comment
      createdAt: new Date(), // Thêm thời gian tạo
      likes: [], // Khởi tạo mảng likes rỗng
    };

    // Thêm reply vào comment
    comment.replies.push(replyComment);

    // Lưu bài viết
    await post.save();

    // Trả về phản hồi thành công
    res
      .status(201)
      .json({ message: "Reply created successfully", replyComment });
  } catch (error) {
    next(error); // Truyền lỗi tới middleware xử lý lỗi
  }
};

const searchPost = async (req, res, next) => {};
export const postController = {
  createNewPost,
  showAllPosts,
  createNewCommentPost,
  showAllComments,
  searchPost,
  replyCommentPost,
};
