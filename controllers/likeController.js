const Like = require("../models/like");
const Blog = require("../models/blog");
const { post } = require("../routes/blog");

exports.createLike = async (req, res) => {
  try {
    const { blog, user } = req.body;

    const like = await Like.Create({
      blog,
      user,
    });

    const updatedPost = await Blog.findByIdAndUpdate(
      post,
      { $push: { likes: like._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

      return res.status(200).json({success: true, message:"liked success"})
  } catch (error) {
    console.log(error);
  }
};

exports.createUnlike = async(req, res) => {
    try{
        const {post, like} = req.body;

        await Like.findByIdAndDelete(like._id)

        const updatedPost = await Blog.findByIdAndUpdate(post, {$pull: {likes: like._id}}, {new: true} )

        return res.status(200).json({success: true, message: "Unlike success"})
    }
    catch(error){
        console.log(error)
    }
}
 