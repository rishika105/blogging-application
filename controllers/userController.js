const User = require("../models/user");

exports.handleRegisterUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.render("signup", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered" });
    }

    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords do not match" });
    }

    await User.create({ fullName, email, password });
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("signup", { error: error.message });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.render("login", { error: "Email not registered" });
    }

    const token = await User.matchPasswordAndToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("login", {
      error: error.message || "Incorrect email or password",
    });
  }
};

