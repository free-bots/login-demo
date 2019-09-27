// only useable with authentication
const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "allowed to read this",
      user: req.user.name
    });
  }
);

module.exports = router;
