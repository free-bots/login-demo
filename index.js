require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const db = require("./model/database/db");
const User = require("./model/user");
const secretApi = require("./routes/secret-api");
const jwtAuthSetup = require("./passport/jwt-setup");
const bodyParser = require("body-parser");
const verify = require("./gAuth/verify");
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/api", secretApi);

app.post("/login", (req, res) => {
  const token = req.body.token;
  verify(req, res).catch(console.error);
});

app.get("/", (req, res) => {
  res.render("index", { gClientID: process.env.gClientID || "" });
});
app.listen(3000, () => {
  console.log(`running on port: ${3000}`);
});
