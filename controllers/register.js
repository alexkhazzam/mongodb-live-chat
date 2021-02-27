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
    accountCreated: req.query.accountCreated === 'yes' ? true : false,
  });
};

module.exports.postRegisterPage = (req, res, next) => {
  registerModel.CreateAccount.EmailInUse(req.body, async (user) => {
    if (user) {
      const accountCreated = await registerModel.CreateAccount.createNewUser(
        user
      ).catch((err) => {
        console.log(`${err}`.red);
        throw err;
      });

      console.log(accountCreated);
      confirmationEmail(user.email).catch(`${console.error}`.red);
      registerEmail(user.email).catch(`${console.error}`.red);
      return res.status(302).redirect('/register/?accountCreated=yes');
    } else {
      res.status(302).redirect('/register/?emailInUse=yes');
    }
  });
};
