const express = require("express");
const app = express();
const passport = require("passport");
const db = require("../model/database/db");
const User = require("../model/user");
const secretApi = require("../routes/secret-api");
const jwtAuthSetup = require("../passport/jwt-setup");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const createToken = (user, res) => {
  jwt.sign(
    { user: user },
    process.env.tokenSecret || "secretKey",
    { expiresIn: "30000s" },
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          token: token
        });
      }
    }
  );
};

const client = new OAuth2Client(process.env.gClientID || "");
async function verify(req, res) {
  const token = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.gClientID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  console.log(payload);
  console.log(userid);
  // create token
  User.findOne({
    where: {
      ProviderID: userid,
      Name: `${payload.given_name} ${payload.family_name}`
    }
  })
    .then(user => {
      if (user) {
        console.log(`user found in db ${user.toJSON()}`);
        createToken({ id: user.id, name: user.Name }, res);
        //done(null, { id: user.id, name: user.Name });
      } else {
        User.create({
          ProviderID: userid,
          Name: `${payload.given_name} ${payload.family_name}`
        })
          .then(userT => {
            console.log(`user created ${userT}`);
            createToken({ id: userT.id, name: userT.Name }, res);
            //done(null, { id: userT.id, name: userT.Name });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = verify;
