import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';

export default async function sendMail({ to, userName, emailLink, subject, template }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILING_EMAIL,
      pass: process.env.MAILING_PASSWORD,
    },
  });

  //  Html replacment
  const data = Handlebars.compile(template);
  const replacments = {
    user_name: userName,
    email_link: emailLink,
  };

  const html = data(replacments);

  // Verify connection config
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log('ERROR [Verify connection]', error);
        reject(error);
      } else {
        console.log('Mail, verify connection');
        resolve(success);
      }
    });
  });

  // Send email
  const options = {
    from: process.env.MAILING_EMAIL,
    to,
    subject,
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error('ERROR [Send mail]', err);
        reject(err);
      } else {
        console.log('Mail, send mail', info);
        resolve(info);
      }
    });
  });
}
