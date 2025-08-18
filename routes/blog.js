const { Router } = require("express");
const {
  handleAddBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogController");
const upload = require("../config/multer");
const { toggleLike } = require("../controllers/likeController");
const { createComment } = require("../controllers/commentController");
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
router.post("/like", toggleLike);
router.post("/comment", createComment);

module.exports = router;
