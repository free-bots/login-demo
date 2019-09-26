const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.gClientID || "",
      clientSecret: process.env.gClientSecret || "",
      callbackURL: "/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // create jwt and check for user
      console.log(profile);

      User.findOne({
        where: { ProviderID: profile.id, Name: profile.displayName }
      })
        .then(user => {
          if (user) {
            console.log(`user found in db ${user.toJSON()}`);
            done(null, { id: user.id, name: user.Name });
          } else {
            User.create({ ProviderID: profile.id, Name: profile.displayName })
              .then(userT => {
                console.log(`user created ${userT}`);
                done(null, { id: userT.id, name: userT.Name });
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
  )
);
