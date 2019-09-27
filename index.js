require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const db = require("./model/database/db");
const User = require("./model/user");
const googleAuthRouter = require("./routes/auth-google");
const googleAuthSetup = require("./passport/setup");
const secretApi = require("./routes/secret-api");
const jwtAuthSetup = require("./passport/jwt-setup");
const jwt = require("jsonwebtoken");

app.use(passport.initialize());
app.use("/api", secretApi);
app.use("/google", googleAuthRouter);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`running on port: ${3000}`);
});
