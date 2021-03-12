const credentialQuestion = require('../../../email/api/chat/security/credentialQuestions');

module.exports.postUserCredentialQuestion = (req, res, next) => {
  credentialQuestion();
  return res.status(200).send('success');

  // return res.sendStatus(404);
};
