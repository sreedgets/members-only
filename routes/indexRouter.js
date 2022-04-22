var express = require('express');
var router = express.Router();
const {
    index,
    signupGet,
    signupPost,
    loginGet,
    loginPost,
    handleSignout
} = require('../controllers/indexController');

const {
    signupValidation
} = require('../helpers/validator');

/* GET home page. */
router.get('/', index);

//Get the signup page
router.get('/signup', signupGet);

router.post('/signup', signupValidation, signupPost);

router.get('/login', loginGet);

router.post('/login', loginPost);

router.get('/signout', handleSignout);

module.exports = router;
