const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' },(email, password, done) => {
    User.findOne({email: email}, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false);
      }
      //Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch)
          return done(null, user);
        else {
          return done(null, false);
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
       console.log("User serialised");
       done(null, user.id);
   });

  passport.deserializeUser((id, done) => {
    console.log("User de-serialised with the id: ", id);
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
