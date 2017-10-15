const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user/model');

passport.use(new LocalStrategy({
    passReqToCallback: true  
  },
  function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});
