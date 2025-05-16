const User = require("../models/user");

exports.handleRegisterUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fields are empty",
      });
    }

    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");

    // return res.status(200).json({
    //   success: true,
    //   message: "Register success",
    // });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Cannot register user",
    });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.matchPassword(email, password);

    console.log(user);
    return res.redirect("/");

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Cannot login user",
    });
  }
};
