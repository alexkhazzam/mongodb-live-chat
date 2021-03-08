const UserSchema = require('../schema/User');
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

  static async doesIdMatch() {
    return true;
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
