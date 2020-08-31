const User = require("../model/user");
const passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "986471774278-o97ctpqitljh90o2p8t96bkjjq7pik8b.apps.googleusercontent.com",
      clientSecret: "RjxujU_siLtsrCrChdldwlGZ",
      callbackURL: "/auth/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleid: profile.id.toString() })
        .then((user) => {
          if (!user) {
            const newuser = new User({
              name: profile.displayName,
              googleid: profile.id,
              cart: {
                items: [],
              },
            });
            newuser.save().then((newuser) => {
              done(null, newuser);
            });
          } else {
            done(null, user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);
