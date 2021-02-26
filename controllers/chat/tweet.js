const tweetModel = require('../../models/chat/tweet');
const curseWords = require('../../util/chat/curseWords');

let tweetObj = {};

module.exports.getTweetPage = async (req, res, next) => {
  res.render('chat', {
    tweets: await tweetModel.HandleTweet.fetchTweets(),
    serverError: req.query.error === 'yes' ? true : false,
    tweet: req.query.tweeted === 'yes' ? tweetObj : false,
    curseWords: curseWords.curseWords,
    page: 'Tweet',
  });
};

module.exports.postTweetPage = (req, res, next) => {
  if (
    req.session &&
    req.session.user &&
    req.session.user.firstName &&
    req.session.user.lastName &&
    req.session.user.email
  ) {
    tweetModel.HandleTweet.storeTweet(
      req.body.tweet.trim(),
      req.session.user,
      res,
      (tweetResult) => {
        tweetObj = { ...tweetResult };
        return res.status(302).redirect('/tweet/?tweeted=yes');
      }
    );
  } else {
    res.status(302).redirect('/tweet/?error=yes');
  }
};
