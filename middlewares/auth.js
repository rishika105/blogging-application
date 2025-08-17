// middlewares/auth.js
const {verifyToken } = require("../utils/authentication");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    
    if (!tokenCookieValue) {
      req.user = null;
      return next();
    }

    try {
      const userPayload = verifyToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      // If token is invalid, clear the cookie
      res.clearCookie(cookieName);
      req.user = null;
    }
    
    return next();
  };
}

// Middleware to protect routes that require authentication
function requireAuth(req, res, next) {
  if (!req.user) {
    // Set cache headers to prevent caching of protected pages
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate, private, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return res.redirect("/login");
  }
  next();
}

// Middleware to prevent authenticated users from accessing login/signup
function redirectIfAuthenticated(req, res, next) {
  if (req.user) {
    return res.redirect("/blog/add-new"); // or your dashboard route
  }
  next();
}

module.exports = {
  checkForAuthCookie,
  requireAuth,
  redirectIfAuthenticated
};