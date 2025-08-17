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
    return res.redirect("/blog/allBlogs"); // or your dashboard route
  }
  next();
}

module.exports = {
  checkForAuthCookie,
  requireAuth,
  redirectIfAuthenticated
};

// ## `checkForAuthCookie` vs `requireAuth`

// ### `checkForAuthCookie("token")` 
// **Purpose**: Simply checks if a valid token exists and adds user info to `req.user`
// - **Does NOT redirect** - just sets `req.user` to either the user object or `null`
// - **Used globally** on all routes to make user info available
// - **Passive check** - doesn't block access to any page

// ### `requireAuth`
// **Purpose**: **Actively protects** routes that need authentication
// - **DOES redirect** to login if user is not authenticated  
// - **Used selectively** on routes that need protection
// - **Active protection** - blocks access and redirects

// ## Updated App.js Structure:## Flow Explanation:

// ```
// User visits any page
//        ↓
// checkForAuthCookie runs (ALWAYS)
// - Checks if token exists in cookies
// - If valid: sets req.user = userObject
// - If invalid/missing: sets req.user = null
// - NEVER redirects or blocks access
//        ↓
// Route handling:
// - "/" → Shows content based on req.user (login button vs user info)
// - "/login" → Shows login form if req.user is null
// - "/signup" → Shows signup form if req.user is null
// - "/blog/*" → requireAuth runs first:
//   - If req.user exists: continue to blog route
//   - If req.user is null: redirect to "/login"
// ```

// ## When to use each:

// ### `checkForAuthCookie` (Global - already in your app.js):
// - ✅ Check user status on ALL routes
// - ✅ Make user info available to templates
// - ✅ Show different content based on login status
// - ❌ Does NOT protect or redirect

// ### `requireAuth` (Selective - for protected routes):
// - ✅ Protect specific routes that need authentication
// - ✅ Redirect to login if not authenticated  
// - ✅ Block unauthorized access
// - ❌ Only use on routes that need protection

// ## Example of how your routes work now:

// 1. **Public routes** (home, login, signup): 
//    - `checkForAuthCookie` runs → sets `req.user`
//    - Route renders with user info available

// 2. **Protected routes** (blog routes):
//    - `checkForAuthCookie` runs → sets `req.user`
//    - `requireAuth` runs → checks if `req.user` exists
//    - If no user: redirect to login
//    - If user exists: continue to blog route

// This way you get the best of both worlds - user info everywhere it's needed, but protection only where required!