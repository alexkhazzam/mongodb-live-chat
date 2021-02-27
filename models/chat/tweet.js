const TweetSchema = require('../../schema/Tweet');

module.exports.HandleTweet = class {
  static async storeTweet(tweet, sessionObj, res, tweetResult) {
    let tweetObj = {
      content: tweet,
      email: sessionObj.email,
      fullName: `${sessionObj.firstName} ${sessionObj.lastName}`,
      age: undefined,
    };

    tweetResult(
      await TweetSchema.create(tweetObj).catch((err) => {
        console.log(`${err}`);
        return res.status(302).redirect('/tweet/?error=yes');
      })
    );
  }

  static async fetchTweets() {
    const sortTweets = (t) => {
      let currentAge = 0;
      t.forEach((tweet) => {
        tweet.age = currentAge;
        currentAge++;
      });

      for (let i = 0; i < t.length; i++) {
        for (let k = t.length - 1; k > i; k--) {
          if (t[k].age > t[i].age) {
            const cp = t[i];
            t[i] = t[k];
            t[k] = cp;
          }
        }
      }
      return t || [];
    };

    return sortTweets(
      await TweetSchema.find().catch((err) => {
        console.log(`${err}`.red);
        res.redirect('/tweet/?error=yes');
      })
    );
  }
};
