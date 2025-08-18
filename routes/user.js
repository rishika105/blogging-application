const { Router } = require("express")
const { handleRegisterUser, handleLogin, handleLogout } = require("../controllers/userController")

const router = Router()

// Comprehensive cache prevention middleware
const preventCache = (req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate, private, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Last-Modified': new Date().toUTCString()
  });
  next();
}

router.get("/login", preventCache, (req, res) => {
  // If user is already logged in, redirect to dashboard
  if (req.user) {
    return res.redirect("/blog/add-new") // or wherever you want logged-in users to go
  }
  res.render("login")
})

router.get("/signup", preventCache, (req, res) => {
  // If user is already logged in, redirect to dashboard  
  if (req.user) {
    return res.redirect("/blog/add-new")
  }
  res.render("signup")
})

router.get("/logout", preventCache, (req, res) => {
  res.clearCookie("token").redirect("/login")
})

router.get("/about", (req, res) => {
return  res.render("about", {user: req.user})
})

router.get("/contact", (req, res) => {
  return res.render("contact", {user: req.user})
})

router.post("/signup", preventCache, handleRegisterUser)
router.post("/login", preventCache, handleLogin)

module.exports = router