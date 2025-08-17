const { response } = require("express");
const User = require("../models/user");

// Helper function for cache prevention
//If we go back from blogs page we dont want login or signup even in cache
const setCacheHeaders = (res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate, private, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Last-Modified': new Date().toUTCString()
  });
}

exports.handleRegisterUser = async (req, res) => {
  try {
    setCacheHeaders(res);
    
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
    return res.redirect("/login"); // Redirect to login after successful signup
  } catch (error) {
    console.log(error.message);
    setCacheHeaders(res);
    return res.render("signup", { error: error.message });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    setCacheHeaders(res);
    
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.render("login", { error: "Email not registered" });
    }

    const token = await User.matchPasswordAndToken(email, password);
    if (!token) {
      return res.render("login", { error: "Incorrect email or password" });
    }

    return res.cookie("token", token, {
      httpOnly: true, // Security: prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict' // CSRF protection
    }).redirect("/blog/allBlogs");
    
  } catch (error) {
    console.log(error.message);
    setCacheHeaders(res);
    return res.render("login", {
      error: error.message || "Incorrect email or password",
    });
  }
};

exports.handleLogout = async (req, res) => {
  try {
    setCacheHeaders(res);
    res.clearCookie("token");
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    setCacheHeaders(res);
    return res.redirect("/login");
  }
};