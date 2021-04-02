const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const root = require('../../../../util/root');
const path = require('path');

dotenv.config({ path: path.join(root, 'dotenv.config.env') });

module.exports = email = async (question, email) => {
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
    from: email,
    to: process.env.NODEMAILER_USER,
    subject: 'Someone asked a credential question!',
    text: `${question}`,
  });

  console.log(`Encrypted message: ${info.messageId}`);
};
