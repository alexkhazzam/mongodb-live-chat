const Express = require('express');
const Router = Express.Router();

const userCredentials = require('../../../../api/chat/security/userCredentials');

Router.get(
  '/api/client/security/user-credentials',
  userCredentials.getUserSecurity
);

module.exports = Router;
