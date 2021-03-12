const Express = require('express');
const Router = Express.Router();

const credentialQuestion = require('../../../../api/chat/security/credentialQuestion');

Router.get(
  '/api/client/security/credential-question',
  credentialQuestion.postUserCredentialQuestion
);

module.exports = Router;
