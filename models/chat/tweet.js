const TweetSchema = require('../../schema/Tweet');

module.exports.HandleTweet = class {
  static async storeTweet(tweet, sessionObj, res, tweetResult) {
    let tweetObj = {
      content: tweet,
      email: sessionObj.email,
      fullName: `${sessionObj.firstName} ${sessionObj.lastName}`,
    };

    tweetObj = await TweetSchema.create(tweetObj).catch((err) => {
      console.log(`${err}`);
      return res.status(302).redirect('/tweet/?error=yes');
    });
    tweetResult(tweetObj);
  }

  static async fetchTweets() {
    const tweetArray = await TweetSchema.find().catch((err) => {
      console.log(`${err}`.red);
      res.redirect('/tweet/?error=yes');
    });
    return tweetArray;
  }
};
