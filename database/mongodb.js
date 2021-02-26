const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const root = require('../util/root');

dotenv.config({ path: path.join(root, 'dotenv.config.env') });

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {
  constructor() {
    this.MONGO_DB_PASS = process.env.MONGO_DB_PASS;
    this.MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
    this.MONGO_DB_DB = process.env.MONGO_DB_DB;

    this.connect();
  }

  connect() {
    mongoose
      .connect(
        `mongodb+srv://admin:${this.MONGO_DB_PASS}@${this.MONGO_DB_CLUSTER}.iixgc.mongodb.net/${this.MONGO_DB_DB}?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log('Database connection established'.green);
      })
      .catch((err) => {
        console.log(`${err}`.red);
        throw err;
      });
  }
}

module.exports = new Database();
