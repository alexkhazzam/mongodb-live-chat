const UserSchema = require('../schema/User');
const ConfirmationTokenSchema = require('../schema/ConfirmationToken');
const bcrypt = require('bcrypt');

module.exports.CreateAccount = class {
  static async emailInUse(email) {
    return await UserSchema.findOne({
      email: email,
    }).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });
  }

  static async doesIdMatch(email, token) {
    return await ConfirmationTokenSchema.findOne({
      token: token,
      email: email,
    }).catch((err) => {
      console.log(`${err}`.red);
      return res.redirect('/error'); // TODO
    });
  }

  static async storeAccessToken(email, token) {
    const payload = {
      token: token,
      email: email,
    };

    const emailInUse = await ConfirmationTokenSchema.findOne({
      email: email,
    }).catch((err) => {
      console.log(`${err}`); // TODO
    });

    if (emailInUse) {
      return await ConfirmationTokenSchema.create(payload).catch((err) => {
        console.log(`${err}`.red); // TODO
      });
    } else {
      res.redirect('/'); // TODO email already storing token
    }
  }

  static async createNewUser(user, res) {
    const newUser = { ...user };
    const saltRounds = 10;

    newUser.password = await bcrypt
      .hash(newUser.password, saltRounds)
      .catch((err) => {
        console.log(`${err}`.red);
        throw err;
      });

    return await UserSchema.create(newUser).catch((err) => {
      console.log(`${err}`.red);
      return res.redirect('/register/?informationPresent=yes&serverError=yes');
    });
  }
};
