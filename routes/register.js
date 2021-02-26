const Express = require('express');
const Router = Express.Router();

const registerController = require('../controllers/register');

Router.get('/register', registerController.getRegisterPage);
Router.post('/register', registerController.postRegisterPage);

module.exports = Router;
