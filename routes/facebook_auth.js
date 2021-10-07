require("dotenv").config();
const express = require("express");
const router = express.Router();
const FacebookStrategy = require("passport-facebook");
const passport = require("passport");
const FacebookUser = require("../models/user");
const { nanoid } = require("nanoid");

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const profileNames = profile.displayName.split(" ");
      const user = new FacebookUser({
        name: profileNames[0],
        lastname: profileNames[1],
        facebookID: profile.id,
        profile_picture: `http://graph.facebook.com/${profile.id}/picture?type=square`,
        apiID: nanoid(),
      });
      try {
        const doesUserExit = await FacebookUser.exists({
          facebookID: profile.id,
        });
        if (!doesUserExit) {
          user.save();
        }

        //await FacebookUser.updateOne({
        //  facebookID: profile.id
        // }, user , {upsert:true});
      } catch (error) {
        console.log(error);
      }

      return cb(null, user);
    }
  )
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: true }),
  function (req, res) {
    res.redirect("/home");
  }
);

module.exports = router;
