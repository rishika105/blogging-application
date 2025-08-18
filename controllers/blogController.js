const Blog = require("../models/blog");

exports.handleAddBlog = async (req, res) => {
  try {
    const id = req.user._id;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.render("addBlog", { error: "All fields are required" });
    }

    let coverImage = null;
    if (req.file) {
      coverImage = req.file.filename; // or req.file.path if you want full path
    }

    await Blog.create({
      title,
      body,
      coverImageURL: coverImage,
      createdBy: id, // assuming you want to link blog with user
    });

    return res.render("addBlog", { message: "Blog creation success" });
  } catch (error) {
    console.log(error);
    return res.render("addBlog", { error: "Cannot create blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("createdBy", "fullName")
      .sort({ createdAt: -1 });
    // console.log(blogs);
    return res.render("allBlogs", { blogs, user: req.user }); // In Express, res.render(view, locals) only takes two arguments:
  } catch (error) {
    console.log(error);
    return res.render("allBlogs", { error: "Failed to fetch blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy", "fullName")
      .populate({
        path: "likes",
        populate: {
          path: "user",
          select: "fullName"
        }
      })
      // .populate({
      //   path: "comments",
      //   populate: {
      //     path: "user",
      //     select: "fullName"
      //   }
      // });

    // Check if current user has liked this blog
    const likedByUser = blog.likes.some(
      (like) => like.user && like.user._id.toString() === req.user._id.toString()
    );

    // console.log("likedByUser:", likedByUser);
     if (!blog) {
      return res.render("blogDetails", { 
        error: "Blog not found", 
        blog: null, 
        user: req.user, 
        likedByUser: false 
      });
    }

    return res.render("blogDetails", { blog, user: req.user, likedByUser });
  } catch (error) {
    console.log(error);
    return res.render("blogDetails", { error: "Cannot get this blog" });
  }
};