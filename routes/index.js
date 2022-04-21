var express = require('express');
var router = express.Router();
const {
    index,
    signupGet,
    signupPost,
    loginGet,
    loginPost
} = require('../controllers/indexController');

/* GET home page. */
router.get('/', index);

router.get('/signup', signupGet);

router.post('/signup', signupPost);

router.get('/login', loginGet);

router.post('/login', loginPost);

module.exports = router;
