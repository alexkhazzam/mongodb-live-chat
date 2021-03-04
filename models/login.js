const UserSchema = require('../schema/User');
const bcrypt = require('bcrypt');

module.exports.AuthenticateUser = class {
  static async fetchEmail(email, callback) {
    return await UserSchema.findOne({ email: email }).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });
  }

  static async comparePasswords(user, password) {
    return await bcrypt.compare(password, user.password).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });
  }
};
