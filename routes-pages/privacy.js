const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("privacy", { layout: "layout-withoutLogin" });
});

module.exports = router;
