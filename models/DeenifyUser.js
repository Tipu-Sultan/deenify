// models/DeenifyUser.js
import mongoose from "mongoose";

const DeenifyUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate Google IDs
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const DeenifyUser = mongoose.models.DeenifyUser || mongoose.model("DeenifyUser", DeenifyUserSchema);

export default DeenifyUser;