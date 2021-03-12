const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const root = require('../../util/root');
const generateString = require('../../util/generateString');
const path = require('path');

dotenv.config({ path: path.join(root, 'dotenv.config.env') });

module.exports = email = async (userEmail, res) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let info = await transporter
    .sendMail({
      from: process.env.NODEMAILER_USER,
      to: userEmail,
      subject: 'Email Confirmation!',
      html: `
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
      </head>
        <div style="background-image: linear-gradient(
          to bottom right,
          rgba(12, 206, 206, 0.85),
          rgba(133, 10, 204, 0.85)
        ); padding: 20px; height: fit-content">
          <div style="margin: auto; text-align: center">
          <img src="https://img.icons8.com/android/50/000000/year-of-goat.png"/>
          </div>
          <h1 style="color: white; text-align: center; letter-spacing: 3px; font-family: 'Montserrat', sans-serif;">
            The Foreign Affairs Club
          </h1>
          <h3 style="color: white; text-align: center; width: 80%; margin: auto">You are recieving this notification because someone used your email to create a live-chat account on our website. If it was not you, then ignore this email; otherwise, enter the following access code in the register page!</h3>
          <ul style="text-align: center; background-color: rgb(243, 243, 243); border: 2px solid white; width: fit-content; margin: auto; padding: 20px; box-shadow: 1px 1px 5px rgba(32, 32, 32, 0.87); margin-top: 30px">
            <li style="list-style: none; text-align: left; color: black">
              Your access code: ${generateString(6)}
            </li>
          </ul>
        </div>
      </html>
      `,
    })
    .catch((err) => {
      console.log(`${err}`.red);
      res.redirect('/register/?error=yes');
    });

  console.log(`Encrypted message: ${info.messageId}`);
};
