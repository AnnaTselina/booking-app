import * as nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import Redis from "ioredis";

export const redisConfirmationEmails = new Redis();

export const sendEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env["SENDGRID_API_KEY"],
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Swap booking app" <swapbookingapp@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Email confirmation", // Subject line
    text: "Confirmation link", // plain text body
    html: `<p>Please, click this <a href=${link}>link</a> to confirm email. It redirects to our site.</p>`, // html body
  });

  return info.messageId;
};

export const confirmEmailLink = async (userId: string) => {
  const id = uuidv4();

  await redisConfirmationEmails.set(id, userId);

  return `http://${process.env["HOST"]}:${process.env["SERVER_PORT"]}/user/confirm/${id}`;
};
