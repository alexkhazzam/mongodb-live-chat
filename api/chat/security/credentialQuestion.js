const credentialQuestion = require('../../../email/api/chat/security/credentialQuestions');

module.exports.postUserCredentialQuestion = (req, res, next) => {
  console.log(req.body.email);

  credentialQuestion(req.body.question.trim(), req.session.user.email);
  return res.status(200).send('success');

  // return res.sendStatus(404);
};
