import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Tạo schema cho collection 'cv'
const cvSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    education: [
      {
        type: Schema.Types.Mixed, // Có thể là array chứa các đối tượng với cấu trúc tùy chỉnh
      },
    ],
    work_experience: [
      {
        type: Schema.Types.Mixed, // Có thể là array chứa các đối tượng với cấu trúc tùy chỉnh
      },
    ],
    skills: [
      {
        type: String, // Mảng chứa các kỹ năng (string)
      },
    ],
    rate_cv: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    postId: {
      type: String, // Lưu postId dưới dạng chuỗi
      required: true,
    },
  },
  { timestamps: true } // Thêm các trường createdAt và updatedAt tự động
);

// Tạo mô hình từ schema
const CV = mongoose.model("CV", cvSchema, "cv");
export default CV;
