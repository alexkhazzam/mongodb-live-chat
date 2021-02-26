const UserSchema = require('../schema/User');
const bcrypt = require('bcrypt');

module.exports.CreateAccount = class {
  static async EmailInUse(registerObj, callback) {
    const matchingEmail = await UserSchema.findOne({
      email: registerObj.email.trim(),
    }).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });

    if (!matchingEmail) {
      const newUser = { ...registerObj };
      delete newUser.passwordConf;
      const saltRounds = 10;

      newUser.password = await bcrypt
        .hash(registerObj.password.trim(), saltRounds)
        .catch((err) => {
          console.log(`${err}`.red);
          throw err;
        });

      callback(newUser);
    } else {
      callback(false);
    }
  }

  static async createNewUser(newUser) {
    const result = await UserSchema.create(newUser).catch((err) => {
      console.log(`${err}`.red);
      throw err;
    });
    return result;
  }
};
