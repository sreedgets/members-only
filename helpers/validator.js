const {body} = require('express-validator');

exports.signupValidation = [
    (req, res, next) => {
        if (!req.body.firstName) {
            req.body.firstName = '';
        }

        if (!req.body.lastName) {
            req.body.lastName = '';
        }

        next();
    },
    body('firstName').trim().escape(),
    body('lastName').trim().escape(),
    body('username').trim().isLength({min:4}).escape(),
    body('password').trim().isLength({min:5}).escape()
];