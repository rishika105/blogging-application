const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
