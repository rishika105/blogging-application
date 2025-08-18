const Blog = require("../models/blog");
const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;
    const { body } = req.body;

    const comment = await Comment.create({ blog: blogId, user: userId, body });

    const updatedPost = Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: comment._id } },
      { new: true }
    ).populate("comment.users", "fullName");

    return res.json({
      success: true,
      commentCount: updatedPost.comments.length,
    });
  } catch (error) {
    console.log(error);
  }
};
