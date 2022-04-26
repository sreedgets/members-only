const User = require('../db/models/user');
const Post = require('../db/models/post');
const async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult } = require('express-validator');

const {
    createPostDate
} = require('../helpers/utils');

exports.index = (req, res, next) => {
    async.parallel({
        posts: callback => {
            Post.find({})
                .populate('author', 'username')
                .exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        const { posts } = results;
        posts.forEach(post => {
            if (post.author === null) {
                post.author = {
                    username: 'deleted'
                };
            } 
        });
        console.log(posts);

        res.render('index', {title: 'Members Only', posts: posts});
    });
}

exports.signupGet = (req, res) => {
    res.render('userForm', {title: 'Members Only | Sign Up', signup: true});
}

exports.signupPost = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors); //for development
        res.render('userForm', {title: 'Members Only | Sign Up', signup: true, errors: errors});
    } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) return next(err);

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPass,
                memberStatus: 'member'
            }).save(err => {
                if (err) return next(err);
    
                res.redirect('/');
            });
        });
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

exports.messageGet = (req, res) => {
    res.render('message', {title: 'Post a message'});
}

exports.messagePost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        datePosted: createPostDate(),
        author: req.user._id,
        text: req.body.message
    }).save(err => {
        if (err) return next(err);

        res.redirect('/');
    });
}