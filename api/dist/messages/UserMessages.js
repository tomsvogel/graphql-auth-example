'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordChangedMessage = exports.ForgotPasswordMessage = exports.ActivateMessage = exports.SOSMessage = exports.ReopenMessage = exports.CloseMessage = exports.CancelMessage = exports.DatesMessage = exports.CommentMessage = exports.RejectedMessage = exports.WaitingMessage = exports.AcceptedMessage = undefined;

var _main = require('../config/main');

var _main2 = _interopRequireDefault(_main);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
_moment2.default.locale('de');

var AcceptedMessage = exports.AcceptedMessage = function AcceptedMessage(eventName) {
  return { title: 'Zusage!', text: 'Zusage zu ' + eventName };
};
var WaitingMessage = exports.WaitingMessage = function WaitingMessage(eventName) {
  return { title: 'Warteliste!', text: 'Warteliste bei ' + eventName };
};
var RejectedMessage = exports.RejectedMessage = function RejectedMessage(eventName) {
  return { title: 'Absage!', text: 'Absage bei ' + eventName };
};
var CommentMessage = exports.CommentMessage = function CommentMessage(eventName) {
  return { title: 'Kommentar!', text: 'Kommentar bei ' + eventName };
};
var DatesMessage = exports.DatesMessage = function DatesMessage(eventName) {
  return { title: 'Termin Änderung!', text: 'Termin Änderung bei ' + eventName };
};

var CancelMessage = exports.CancelMessage = function CancelMessage(eventName) {
  return { title: 'Event abgesagt!', text: eventName + ' wurde abgesagt' };
};
var CloseMessage = exports.CloseMessage = function CloseMessage(eventName) {
  return {
    title: 'Event geschlossen!',
    text: eventName + ' wurde für Anmeldungen geschlossen'
  };
};
var ReopenMessage = exports.ReopenMessage = function ReopenMessage(eventName) {
  return {
    title: 'Event wieder geöffnet!',
    text: eventName + ' ist wieder für Anmeldungen geöffnet'
  };
};

var SOSMessage = exports.SOSMessage = function SOSMessage(eventName, eventDate, recipientId) {
  var formattedDate = (0, _moment2.default)(eventDate).format('L');
  return {
    title: 'SOS! Wir brauchen Unterstützung bei dem Event ' + eventName,
    text: '\nHallo!<br />\nSOS!<br />\n<br />\nWir brauchen am ' + formattedDate + ' noch ganz dringend Unterst\xFCtzung von dir!<br />\nBitte schnell unter <a href="' + _main2.default.backend + '">' + _main2.default.backend + '</a> einloggen und dich gleich anmelden.<br />\nWir freuen uns schon dich bald bei uns begr\xFC\xDFen zu d\xFCrfen!<br />\n<br />\nVielen Dank f\xFCr deine spontane Unterst\xFCtzung!<br />\nDas gesamte ' + _main2.default.client + ' Team<br />\n<br />\n<img src="' + _main2.default.endpoint + '/api/logo/' + recipientId + '/' + _main2.default.client.toLowerCase() + '-logo.jpg" />\n',
    pushText: 'Wir brauchen am ' + formattedDate + ' noch ganz dringend Unterstützung von dir!'
  };
};

var ActivateMessage = exports.ActivateMessage = function ActivateMessage() {
  return {
    title: 'Herzlich willkommen!',
    text: '\nHallo und herzlich willkommen im Team von ' + _main2.default.clientTitle + '!<br />\n<br />\nDein Benutzer wurde gerade freigeschalten und somit steht nichts mehr im Wege um sich f\xFCr die ersten Termine anzumelden!<br />\nEinfach unter <a href="' + _main2.default.backend + '">' + _main2.default.backend + '</a> einloggen und los geht\xB4s!<br />\nWir freuen uns dich schon bald bei uns begr\xFC\xDFen zu d\xFCrfen!<br />\n<br />\nLiebe Gr\xFC\xDFe!<br />\nDas gesamte ' + _main2.default.client + ' Team\n'
  };
};

var ForgotPasswordMessage = exports.ForgotPasswordMessage = function ForgotPasswordMessage(token) {
  var resetPasswordUrl = _main2.default.backend + '/#/reset-password/' + token;
  return {
    title: 'Passwort vergessen?',
    text: '\nDu hast dein Passwort vergessen? <br />\nGar kein Problem!<br />\n<br />\nUnter folgendem Link kannst du dein altes Passwort zur\xFCcksetzen und ganz einfach ein neues eingeben:<br />\n<a href="' + resetPasswordUrl + '">' + resetPasswordUrl + '</a><br />\n<br />\nLiebe Gr\xFCsse!<br />\nDas gesamte ' + _main2.default.client + ' Team\n'
  };
};

var PasswordChangedMessage = exports.PasswordChangedMessage = function PasswordChangedMessage() {
  var message = {
    title: 'Password geändert',
    text: '\nDu erh\xE4lst diese Email, weil du dein Passwort ge\xE4ndert hast.<br /><br />\nBitte kontaktiere uns sofort, falls du diese \xC4nderung nicht angefortert hast.<br />\n<br />\nLiebe Gr\xFCsse!<br />\nDas gesamte ' + _main2.default.client + ' Team\n'
  };
  return message;
};