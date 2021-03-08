const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const root = require('../util/root');
const path = require('path');

dotenv.config({ path: path.join(root, 'dotenv.config.env') });

module.exports = email = async (userObj) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: process.env.NODEMAILER_USER,
    subject: 'Someone Created an Account!',
    text: `${userObj}`,
  });

  console.log(`Encrypted message: ${info.messageId}`);
};
