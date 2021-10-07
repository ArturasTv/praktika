const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { user: req.session.passport.user });
});

module.exports = router;
