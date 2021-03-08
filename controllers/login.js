const loginModel = require('../models/login');
const dotenv = require('dotenv');
const path = require('path');
const root = require('../util/root');

dotenv.config({ path: path.join(root, '../', 'dotenv.config.env') });

module.exports.getLoginPage = (req, res, next) => {
  if (req.session && req.session.user) {
    req.session.destroy(() => {
      console.log('session destroyed'.red);
    });
  }

  res.render('login', {
    display: req.query.loginInvalid === 'yes' ? 'block' : 'none',
    email: process.env.LOGIN_USER,
    pass: process.env.LOGIN_PASS,
  });
};

module.exports.postLoginPage = async (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const errorUrl = '/login/?loginInvalid=yes';

  const redirection = (url) => {
    return res.status(302).redirect(url);
  };

  const user = await loginModel.AuthenticateUser.fetchEmail(email);

  if (user) {
    const passwordsMatch = await loginModel.AuthenticateUser.comparePasswords(
      user,
      password
    );
    if (passwordsMatch) {
      req.session.user = user;
      return redirection('/home');
    } else {
      return redirection(errorUrl);
    }
  } else {
    redirection(errorUrl);
  }
};
