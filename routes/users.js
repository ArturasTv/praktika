const express = require("express");
const request = require("request");
const router = express.Router();
const FacebookUser = require("../models/user");

router.get("/", async (req, res) => {
  let users = await FacebookUser.find(
    {},
    { _id: 0, name: 1, lastname: 1, apiID: 1 }
  );
  res.send(users);
});

module.exports = router;
