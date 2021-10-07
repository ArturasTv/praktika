const express = require("express");
const request = require("request");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { nanoid } = require("nanoid");
const Picture = require("../models/picture");

// default options
router.use(fileUpload());

router.put("/", function (req, res) {
  if (req.files.sampleFile.length > 1) {
    return res.render("message", {
      layout: "layout-withoutLogin",
      message: "Pasirinkite tik vieną nuotrauką",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.render("message", {
      layout: "layout-withoutLogin",
      message: "Nepasirinktas failas",
    });
  }
  if (!req.files.sampleFile.mimetype.startsWith("image")) {
    return res.render("message", {
      layout: "layout-withoutLogin",
      message:
        "Netinkamas formatas. Pasirinkite nuotrauką(.gif .jpg, .jpeg, .jfif, .png, .svg, .bmp)",
    });
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const id = req.session.passport.user.facebookID;
  //console.log(id);
  const nano = nanoid();
  const sampleFile = req.files.sampleFile;
  const extension = sampleFile.mimetype.split("/")[1];
  const uploadPath = `${__dirname}/../pictures/${nano}.${extension}`;
  const staticPath = `${req.protocol}://${req.get(
    "host"
  )}/images/${nano}.${extension}`;
  const picture = new Picture({
    static: staticPath,
    path: uploadPath,
    facebookID: id,
    name: sampleFile.name,
  });

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      await picture.save();

      return res.render("message", {
        layout: "layout-withoutLogin",
        message: "Įkelta sėkmingai",
      });
    }
  });
});

module.exports = router;
