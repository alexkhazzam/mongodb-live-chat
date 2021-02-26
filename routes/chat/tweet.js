const Express = require('express');
const Router = Express.Router();

const tweetAPI = require('../../controllers/chat/tweet');

Router.get('/tweet', tweetAPI.getTweetPage);

Router.post('/tweet', tweetAPI.postTweetPage);

module.exports = Router;
