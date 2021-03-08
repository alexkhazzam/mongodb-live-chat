const registerModel = require('../models/register');
const registerEmail = require('../email/register');
const confirmationEmail = require('../email/confirmation');

module.exports.getRegisterPage = (req, res, next) => {
  res.render('register', {
    emailInUse: req.query.emailInUse === 'yes' ? true : false,
    sendConfEmail: req.query.sendConfEmail === 'yes' ? false : true,
    idSubmitted: req.query.idSubmitted === 'yes' ? true : false,
    idSent: req.query.idSent === 'yes' ? true : false,
    emailInUse: req.query.emailInUse === 'yes' ? true : false,
    informationPresent: req.query.informationPresent === 'yes' ? true : false,
    emailVal: req.query.emailVal,
    invalidId: req.query.invalidId === 'yes' ? true : false,
    serverError: req.query.serverError === 'yes' ? true : false,
    accountCreated: req.query.accountCreated === 'yes' ? true : false,
  });
};

module.exports.postRegisterPage = async (req, res, next) => {
  const email = req.body.email.trim();

  const redirection = (url) => {
    return res.status(302).redirect(`/register/?${url}`);
  };

  if (req.query.sendConfEmail) {
    const emailInUse = await registerModel.CreateAccount.emailInUse(email);

    if (!emailInUse) {
      confirmationEmail(email, res);
      return redirection(`idSent=yes&emailVal=${email}`);
    } else {
      return redirection(`emailInUse=yes&emailVal=${email}`);
    }
  } else if (req.query.idSubmitted) {
    const idMatches = await registerModel.CreateAccount.doesIdMatch;

    if (idMatches) {
      req.session.tentativeSignIn = email;
      return redirection(`informationPresent=yes&emailVal=${email}`);
    } else {
      return redirection(`invalidId=yes&emailVal=${email}`);
    }
  } else if (
    req.session.tentativeSignIn &&
    req.session.tentativeSignIn === email
  ) {
    const userObj = {
      email: email,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      password: req.body.password.trim(),
    };

    registerEmail(
      await registerModel.CreateAccount.createNewUser(userObj, res)
    );

    req.session.destroy(() => {
      console.log('session destroyed'.red);
    });

    return redirection(`informationPresent=yes&accountCreated=yes`);
  } else {
    redirection(`informationPresent=yes&serverError=yes`);
  }
};
