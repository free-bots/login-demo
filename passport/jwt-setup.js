const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.tokenSecret || ""
    },
    (jwt_payload, done) => {
      console.log("in jwt setup");
      console.log(jwt_payload);
      // do some validation
      done(null, jwt_payload.user);
    }
  )
);
