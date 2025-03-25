import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Ensure slugs are unique
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true, // HTML content from React Quill
  },
  imageUrl: {
    type: String,
    default:''
  },
  category: {
    type: String,
    default:''
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeenifyUser", 
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeenifyUser", 
    required: true,
  },
  authorGoogleId: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` before saving
BlogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const DeenifyBlog = mongoose?.models?.DeenifyBlog || mongoose?.model("DeenifyBlog", BlogSchema);

export default DeenifyBlog;