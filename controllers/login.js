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

module.exports.postLoginPage = (req, res, next) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  loginModel.AuthenticateUser.fetchEmail(email, async (user) => {
    if (user) {
      const passwordsMatch = await loginModel.AuthenticateUser.comparePasswords(
        user,
        password
      );
      if (passwordsMatch) {
        req.session.user = user;
        return res.status(302).redirect('/home');
      } else {
        return res.status(302).redirect('/login/?loginInvalid=yes');
      }
    } else {
      res.status(302).redirect('/login/?loginInvalid=yes');
    }
  });
};
