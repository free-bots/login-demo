require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const db = require("./model/database/db");
const User = require("./model/user");
const googleAuthRouter = require("./routes/auth-google");
const googleAuthSetup = require("./passport/setup");

app.use(passport.initialize());
app.use("/google", googleAuthRouter);

app.listen(3000, () => {
  console.log(`running on port: ${3000}`);
});
