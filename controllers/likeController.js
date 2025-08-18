const Like = require("../models/like");
const Blog = require("../models/blog");

exports.toggleLike = async (req, res) => {
  try {
    const { blogId } = req.body; // blogId should come from hidden input or AJAX
    const userId = req.user._id; // assuming user is logged in
    const existingLike = await Like.findOne({ blog: blogId, user: userId });

    let updatedPost;
    let liked = false;

    if (existingLike) {
      //unlike
      await Like.findByIdAndDelete(existingLike._id);

      updatedPost = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: existingLike._id } },
        { new: true }
      );

    } else {
      //like
      const newLike = await Like.create({ user: userId, blog: blogId });

      updatedPost = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { likes: newLike._id } },
        { new: true }
      );
      liked = true;
    }
    
      return res.json({
        success: true,
        liked: liked,
        likesCount: updatedPost.likes.length,
      });

  } catch (error) {
     console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
