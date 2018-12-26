const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new LocalStrategy((username, password, done) => {

    //Match username
    let query = {
      username: username
    };


    User.findOne(query, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: "No user found"
        });
      }

      //Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch)
          return done(null, user);
        else {
          return done(null, false, {
            message: "Wrong password"
          });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
       console.log("User serialised");
       done(null, user);
   });

  passport.deserializeUser((id, done) => {
    console.log("User de-serialised");
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
