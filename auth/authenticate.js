const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../db/models/user');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) return done(err);

            if (!user) return done(null, false, {message: 'Incorrect username'});

            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            });
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});