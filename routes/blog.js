const { Router } = require("express");
const { handleAddBlog } = require("../controllers/blogController");
const upload = require("../config/multer");
const blog = require("../models/blog");
const router = Router();

router.get("/add-new", (req, res) => {
  return res.render(
    "addBlog",
    { user: req.user } //nav bar must be correct in this page also
  );
});

router.get("/all", async (req, res) => {
  try {
    const blogs = await blog
      .find({})
      .populate("createdBy", "fullName")
      .sort({ createdAt: -1 });
    res.render("allBlogs", {blogs, user: req.user });// In Express, res.render(view, locals) only takes two arguments:
  } catch (error) {
    console.log(error);
    return res.render("/", { error: "Failed to fetch blogs" });
  }
});

router.post("/addBlog", upload.single("coverImage"), handleAddBlog);

module.exports = router;
