const Express = require('express');
const Router = Express.Router();

const privacyPolicyController = require('../controllers/privacyPolicy');

Router.get('/privacy-policy', privacyPolicyController.getPrivacyPolicyPage);

module.exports = Router;
