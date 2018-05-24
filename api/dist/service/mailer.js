'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmails = sendEmails;

var _main = require('../config/main');

var _main2 = _interopRequireDefault(_main);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _logger = require('../helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _envConstants = require('../constants/envConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smtpConfig = {
  host: _main2.default.mail.host,
  port: _main2.default.mail.port,
  secure: _main2.default.mail.ssl,
  requireTLS: true,
  auth: {
    user: _main2.default.mail.user,
    pass: _main2.default.mail.password
  },
  pool: true,
  maxConnections: 1,
  rateLimit: 10
};

var transporter = _nodemailer2.default.createTransport(smtpConfig);

// Create and export function to send emails through Mailgun API
function sendEmails(_ref, message) {
  var to = _ref.to,
      bcc = _ref.bcc;

  var disclaimer = '\nDen Inhalt dieses Mails kannst du ignorieren, eigentlich sollten im Testmodus keine Mails verschickt werden.<br />\nTut uns leid, dass du dennoch eines bekommen hast.<br />\n<br />\nBitte leite uns dieses Mail an info@arkulpa.at weiter, damit wir den Fehler schnellst m\xF6glich beheben k\xF6nnen.<br />\n<br />\n  ';

  var mailOptions = _main2.default.env === _envConstants.ENV_PROD ? {
    from: _main2.default.senderEmail,
    to: to,
    bcc: bcc,
    subject: message.subject, // Subject line
    text: message.text, // plain text body
    html: message.text // html body
  } : {
    from: _main2.default.senderEmailDev,
    to: to,
    bcc: bcc,
    subject: '**** DAS IST NUR EIN TEST ***** ' + message.subject, // Subject line
    text: disclaimer + message.text, // plain text body
    html: disclaimer + message.text // html body
  };
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        _logger2.default.error(error);
        reject(error);
      } else {
        _logger2.default.info('Message' + info.messageId + ' sent: ' + info.response + ' to ' + (to || bcc));
        resolve(info);
      }
    });
  });
}