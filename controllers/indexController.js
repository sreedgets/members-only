exports.index = (req, res) => {
    res.render('index', { title: 'Members Only' });
}

exports.signupGet = (req, res) => {
    res.render('userForm', {title: 'Members Only | Sign Up', signup: true});
}

exports.signupPost = (req, res) => {
    res.send(req.body);
}

exports.loginGet = (req, res) => {
    res.render('userForm', {title: 'Members Only | Login', signup: false});
}

exports.loginPost = (req, res) => {
    res.send(req.body);
}