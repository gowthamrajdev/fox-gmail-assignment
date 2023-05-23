import passport from 'passport';
const googleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '1019313247800-ifk1afqrpmg2mgslh6vmln0cbnc8agr2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new googleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/users/auth/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log('profile', profile);
    return done(null, profile)
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('-->', user)
  done(null, {message: 'logged out'});
});