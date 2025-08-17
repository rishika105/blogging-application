const { Router } = require("express");
const { handleAddBlog, getAllBlogs, getBlogById } = require("../controllers/blogController");
const upload = require("../config/multer");
const blog = require("../models/blog");
const router = Router();

router.get("/add-new", (req, res) => {
  return res.render(
    "addBlog",
    { user: req.user } //nav bar must be correct in this page also
  );
});

router.post("/addBlog", upload.single("coverImage"), handleAddBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getBlogById);

module.exports = router;
