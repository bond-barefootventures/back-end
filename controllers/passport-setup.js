
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(err, user);
});


passport.use(new GoogleStrategy({
  clientID: "133821515028-s5mhubu4honaq8vor2eiftefcgv8rglc.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "BOND deployed Heroku URL"
},
function(accessToken, refreshToken, profile, done) {
  // use the profile info (mainly profile id) to check if the user is registered in your database
    return done(null, profile);
  }));
