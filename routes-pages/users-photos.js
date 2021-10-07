const express = require("express");
const request = require("request");
const router = express.Router();
const FacebookUser = require("../models/user");

router.get("/:id", async (req, res) => {
  let id = await FacebookUser.find(
    { apiID: req.params.id },
    { _id: 0, facebookID: 1 }
  );

  if (id.length == 0) res.redirect("/home");

  res.render("users-photos", { layout: "layout-withoutLogin" });
});

module.exports = router;
