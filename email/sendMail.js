var nodemailer = require('nodemailer');

module.exports = (reciever, subject, message) => {

  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: reciever,
      subject: subject,
      html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(error);
      } else {
        resolve('Email sent: ' + info.response);
      }
    });
  });
}
