'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentChangeMessage = exports.UserAddedToEventMessage = exports.UserRegisteredMessage = undefined;

var _main = require('../config/main');

var _main2 = _interopRequireDefault(_main);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment2.default.locale('de');

var UserRegisteredMessage = exports.UserRegisteredMessage = function UserRegisteredMessage(_ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      _id = _ref._id,
      email = _ref.email,
      phone = _ref.phone;
  return { title: 'Neuer Benutzer registriert', text: '\nHallo!<br /><br />\n' + lastName + ' ' + firstName + ' hat sich neu registriert.<br />\nDer Benutzer kann unter folgendem Link reviewed und freigeschalten werden:<br />\n<a href="' + _main2.default.backend + '/#/user/' + _id + '">Benutzer Profil</a><br /><br />\nEmail: ' + email + '<br />\nNummer: ' + phone + '<br /><br />\nLiebe Gr\xFC\xDFe!<br />\nEAP-System\n' };
};

var UserAddedToEventMessage = exports.UserAddedToEventMessage = function UserAddedToEventMessage(_ref2, _ref3, comment) {
  var firstName = _ref2.firstName,
      lastName = _ref2.lastName,
      _id = _ref2._id,
      email = _ref2.email,
      phone = _ref2.phone;
  var eventId = _ref3._id,
      eventName = _ref3.name;
  return { title: 'Neue Helfer Anmeldung', text: '\nHallo!<br /><br />\n<a href="' + _main2.default.backend + '/#/user/' + _id + '">' + lastName + ' ' + firstName + '</a> hat sich als Helfer f\xFCr das Event \n<a href="' + _main2.default.backend + '/#/event/' + eventId + '">' + eventName + '</a> registriert.<br /><br />\n' + (comment ? 'Kommentar:<br />\n' + comment + '<br /><br />' : '') + '\nEmail: ' + email + '<br />\nNummer: ' + phone + '<br /><br />\nLiebe Gr\xFC\xDFe!<br />\nEAP-System\n' };
};

var CommentChangeMessage = exports.CommentChangeMessage = function CommentChangeMessage(_ref4, _ref5, comment) {
  var firstName = _ref4.firstName,
      lastName = _ref4.lastName,
      _id = _ref4._id,
      email = _ref4.email,
      phone = _ref4.phone;
  var eventId = _ref5._id,
      eventName = _ref5.name,
      startDate = _ref5.startDate;
  return { title: 'Kommentar Änderung', text: '\nHallo!<br /><br />\n<a href="' + _main2.default.backend + '/#/user/' + _id + '">' + lastName + ' ' + firstName + '</a> hat sein Kommentar bei dem Event \n<a href="' + _main2.default.backend + '/#/event/' + eventId + '">' + eventName + '</a> (' + (0, _moment2.default)(startDate).format('LL') + ') ge\xE4ndert.\n<br /><br />\nKommentar:<br />\n' + comment + '<br /><br />\nEmail: ' + email + '<br />\nNummer: ' + phone + '<br /><br />\nLiebe Gr\xFC\xDFe!<br />\nEAP-System\n' };
};

//$subject = "Kommentar bei der Veranstaltung $Event_Name am $Begin_Time wurde geaendert!";
//$message = "Hallo!\n \nDer User $Name hat seinen Kommentar bei der als abgeschlossen markierten Veranstaltung geaendert.\nDer neue Kommentar lautet: $comment \nDen User kannst du mit der Handynummer: $Phone_Number erreichen.\n\nLiebe Gruesse!\n \nEAP-System";

//"Kommentar bei der Veranstaltung $Event_Name am $Begin_Time wurde geändert!";

/*
$MailRecord->Subject = "Kommentar bei der Veranstaltung $Event_Name wurde geändert!";
$MailRecord->Body = "Hallo! <br><br>
Der User $Name hat seinen Kommentar bei der als abgeschlossen markierten Veranstaltung $Event_Name am $Begin_Time geändert.<br>
Der neue Kommentar lautet: $Anmerkung <br>
Den User kannst du mit der Handynummer: $Phone_Number erreichen.
  Liebe Grüße!<br><br>
EAP-System";*/