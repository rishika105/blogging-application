const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user");
const mongoose = require("mongoose")
const database = require("./config/database")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database.connect();

// design file
//serve static files
app.use(express.static("public"));
app.set("view engine", "ejs");

// routers
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", userRoutes);

// server listening
app.listen(PORT, () => {
  console.log(`The Server started on PORT:${PORT}`);
});
