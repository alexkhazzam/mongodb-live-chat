const UserSchema = require('../schema/User');

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

  static async createNewUser(newUser, res) {
    const result = await UserSchema.create(newUser).catch((err) => {
      console.log(`${err}`.red);
      return res.redirect('/register/?informationPresent=yes&serverError=yes');
    });
    return result;
  }
};
