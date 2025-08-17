const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog")
const mongoose = require("mongoose")
const database = require("./config/database")
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const { checkForAuthCookie, requireAuth } = require("./middlewares/auth");

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthCookie("token"))
// app.use(express.static(path.resolve("./uploads")))


database.connect();

// design file
//serve static files
app.use(express.static("public"));
app.set("view engine", "ejs");

// routers
app.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
  });
});

app.use("/", userRoutes);
app.use("/blog", requireAuth, blogRoutes)

// server listening
app.listen(PORT, () => {
  console.log(`The Server started on PORT:${PORT}`);
});
