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
      coverImageURL:coverImage,
      createdBy: id, // assuming you want to link blog with user
    });

    return res.render("addBlog", { message: "Blog creation success" });
  } catch (error) {
    console.log(error);
    return res.render("addBlog", { error: "Cannot create blog" });
  }
};

