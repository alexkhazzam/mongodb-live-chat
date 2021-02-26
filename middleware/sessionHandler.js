module.exports.sessionHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log('session is defined'.green);
    return next();
  } else {
    console.log(`session is ${req.session.user}`.red);
    return res.redirect('/register');
  }
};
