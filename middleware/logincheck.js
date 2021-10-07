const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

module.exports = function (request, response, next) {
  if (
    request.path.startsWith("/users-photos") ||
    request.path.startsWith("/privacy")
  ) {
    next();
  }
  if (request.session.passport && request.path === "/login") {
    response.redirect("/home");
  }
  if (!request.session.passport && request.path != "/login") {
    response.redirect("/login");
  } else {
    next();
  }
};
