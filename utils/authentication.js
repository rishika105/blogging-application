const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
  return token;
}

function verifyToken(token) {
  if (!token) throw new Error("No token provided");
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}

module.exports = { generateToken, verifyToken };
