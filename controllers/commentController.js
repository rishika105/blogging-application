const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    const { body, blogId } = req.body;
    const userId = req.user._id;

    const comment = await Comment.create({ blog: blogId, user: userId, body });
    
    // Populate the user data for the new comment
    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'fullName');

    await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    // Get updated comment count
    const blog = await Blog.findById(blogId);
    
    return res.json({
      success: true,
      commentCount: blog.comments.length,
      comment: populatedComment
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Failed to add comment" });
  }
};