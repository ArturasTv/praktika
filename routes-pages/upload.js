const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("upload");
});

module.exports = router;
