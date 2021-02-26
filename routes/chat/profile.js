const Express = require('express');
const Router = Express.Router();

const profileController = require('../../controllers/chat/profile');

Router.get('/home', profileController.getProfilePage);

module.exports = Router;
