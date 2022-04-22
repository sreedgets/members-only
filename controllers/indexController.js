const User = require('../db/models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.index = (req, res) => {
    res.render('index', { title: 'Members Only' });
}

exports.signupGet = (req, res) => {
    res.render('userForm', {title: 'Members Only | Sign Up', signup: true});
}

exports.signupPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        res.render('userForm', {title: 'Members Only | Sign Up', signup: true, errors: errors});
    } else {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            memberStatus: 'member'
        }).save(err => {
            if (err) return next(err);

            res.redirect('/');
        })
    }
}

exports.loginGet = (req, res) => {
    res.render('userForm', {title: 'Members Only | Login', signup: false});
}

exports.loginPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
});

exports.handleSignout = (req, res) => {
    req.logout();
    res.redirect('/');
}