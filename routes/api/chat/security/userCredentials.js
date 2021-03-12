const Express = require('express');
const Router = Express.Router();

const securityController = require('../../../../api/chat/security/userCredentials');

Router.get(
  '/api/client/security/user-credentials',
  securityController.getUserSecurity
);

module.exports = Router;
