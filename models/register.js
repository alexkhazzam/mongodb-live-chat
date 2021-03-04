const UserSchema = require('../schema/User');

module.exports.CreateAccount = class {
  static async emailInUse(email) {
    callback(
      await UserSchema.findOne({
        email: email,
      }).catch((err) => {
        console.log(`${err}`.red);
        throw err;
      })
    );
  }

  static doesIdMatch() {
    return false;
  }

  static async createNewUser(newUser) {
    const result = await UserSchema.create(newUser).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });
    return result;
  }
};
