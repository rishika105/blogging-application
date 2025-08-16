const { verifyToken } = require("../utils/authentication");

const checkForAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) next();

    try {
      const userPayload = verifyToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }
    next();
  };
};

module.exports = { checkForAuthCookie };
