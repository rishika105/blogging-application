//when i go back after logging in it cant take me again to login page so to prevent it

export function redirectIfLoggedIn(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }
  return next();
}
