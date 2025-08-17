const { Router } = require("express");
const { handleAddBlog } = require("../controllers/blogController");
const upload = require("../config/multer");
const router = Router();

router.get("/add-new", (req, res) => {
  return res.render(
    "addBlog",
    { user: req.user } //nav bar must be correct in this page also
  );
});

router.get("add-new", )

router.post("/addBlog", upload.single("coverImage"), handleAddBlog);

module.exports = router;
