const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECTION_URL,

    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))