const router = require("express").Router();
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile"], session: false }),
  (req, res) => {
    res.send("login");
  }
);

router.get(
  "/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user);
    res.send("callback");
  }
);

module.exports = router;
