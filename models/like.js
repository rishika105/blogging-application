
// models/like.js
const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Changed from String to ObjectId
    ref: "User",  // Added reference to User model
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Likes", likeSchema);
