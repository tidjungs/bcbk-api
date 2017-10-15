// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const user = require('./user/model');

// passport.use('local-login', new LocalStrategy({
//   usernameField : 'username',
//   passwordField : 'password',
//   passReqToCallback : true
// }, (req, username, password, done) => {
//   User.findOne({ 'username': username.toLowerCase() }, (err, user) => {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false, { msg: 'user not found' } ); }
//     user.comparePassword(password, (err, isMatch) => {
//       if (err) { return done(err); }
//       if (isMatch) {
//         return done(null, user);
//       }
//       return done(null, false, { msg: 'Invalid email or password.' });
//     });
//   });
// }));

// module.exports = {
//   authenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');    
//   }
// }


