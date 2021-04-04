const Express = require('express');
const Router = Express.Router();

const likeController = require('../../../../api/chat/tweet/like');

Router.post('/api/client/tweet/post-liked', likeController.like);

module.exports = Router;
