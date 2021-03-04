const registerModel = require('../models/register');
const registerEmail = require('../email/register');
const confirmationEmail = require('../email/confirmation');

module.exports.getRegisterPage = (req, res, next) => {
  if (req.session && req.session.user) {
    req.session.destroy(() => {
      console.log('session destroyed'.red);
    });
  }

  res.render('register', {
    emailInUse: req.query.emailInUse === 'yes' ? true : false,
  });
};

module.exports.postRegisterPage = async (req, res, next) => {
  const email = req.body.email.trim();
  if (req.body.firstName && req.body.lastName && req.body.email) {
    const emailInUse = await registerModel.CreateAccount.emailInUse(email);
    if (!emailInUse) {
      // TODO create account
      return res.redirect('/register');
    } else {
      // TODO email taken
      return res.redirect('/register');
    }
  } else if (req.body.id && req.body.email && req.body.password) {
    confirmationEmail.email(email, res);
    return res.redirect('/register');
  }
};
