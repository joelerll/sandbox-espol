module.exports.enviar = (correo,clave) => {
  'use strict';
  const nodemailer = require('nodemailer');
  const config = require('./mail_config.js')
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: config.user,
          pass: config.pass
      }
  });

  let mailOptions = {
      from: '"Sandbox espol correo 💻" ' + config.user,
      to: correo,
      subject: 'Mi clave sandbox',
      html: `<h1>CLAVE 🔑<h1>
      <p>Esta es la clave con la que puede crear su cuenta en espol sandbox app</p>
       </br>
       ${clave}
      `
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
