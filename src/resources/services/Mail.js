import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
function authMailer(email, text, link) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  return new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail with defined transport object
    let info = {
      from: process.env.MAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: text, // plain text body
      html: `<a>${link}</a>`, // html body
    };

    transporter.sendMail(info, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve("sent");
    });
  });
}

const emailService = {
  authMailer,
};

export default emailService;
