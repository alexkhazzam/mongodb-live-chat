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
  const rootUrl = '/register/?';

  if (req.query.sendConfEmail) {
    const emailInUse = await registerModel.CreateAccount.emailInUse(email);
    if (!emailInUse) {
      confirmationEmail(email, res);
      return res.redirect(`${rootUrl}idSent=yes&emailVal=${email}`);
    } else {
      return res.redirect(`${rootUrl}emailInUse=yes&emailVal=${email}`);
      // Query params encrypted through HTTPS => passing emails is not a security risk
    }
  } else if (req.query.idSubmitted) {
    // const idMatches = await registerModel.CreateAccount.validateId();
    const idMatches = await registerModel.CreateAccount.doesIdMatch;
    if (idMatches) {
      req.session.tentativeSignIn = email;
      return res.redirect(`${rootUrl}informationPresent=yes&emailVal=${email}`);
    } else {
      return res.redirect(`${rootUrl}invalidId=yes&emailVal=${email}`);
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
    return res.redirect(`${rootUrl}informationPresent=yes&accountCreated=yes`);
  } else {
    res.redirect(`${rootUrl}informationPresent=yes&serverError=yes`);
  }
};
