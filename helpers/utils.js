

exports.createPostDate = () => {
    const dateObj = new Date;
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const dateString = `${month} - ${day} - ${year}`;

    return dateString;
}

exports.catchUnauthorizedRequest = (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.send('Unauthorized Request');
}