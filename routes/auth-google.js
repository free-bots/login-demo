const router = require("express").Router();
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
    session: false
  }),
  (req, res) => {
    res.send("login");
  }
);

router.get(
  "/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    console.log("in callback");
    console.log(req.user);
    const token = req.user;
    //res.send("callback");
    res.redirect(`/?token=${token}`);
  }
);

module.exports = router;
