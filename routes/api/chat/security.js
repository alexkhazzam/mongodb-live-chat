const Express = require('express');
const Router = Express.Router();

const securityController = require('../../../api/chat/security');

Router.get('/security', securityController.getUserSecurity);

module.exports = Router;
