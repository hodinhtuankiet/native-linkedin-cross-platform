import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  cv: {
    fileName: { type: String, required: true },
    filePath: { type: String, required: true }, // hoặc file URL nếu được lưu cloud
    fileType: { type: String, default: "application/pdf" },
  },
});

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;
