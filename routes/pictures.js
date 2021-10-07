const express = require("express");
const request = require("request");
const router = express.Router();
const Picture = require("../models/picture");
const FacebookUser = require("../models/user");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let fbID = await FacebookUser.find({ apiID: id }, { _id: 0, facebookID: 1 });
  let users = await Picture.find(
    { facebookID: fbID[0].facebookID },
    { _id: 0, static: 1 }
  );
  res.send(users);
});

module.exports = router;
