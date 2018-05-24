'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeUserPDF = exports.writeEventPDF = undefined;

var writeEventPDF = exports.writeEventPDF = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var source, event, helpers, template, html, options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = _fs2.default.readFileSync(__dirname + '/../../pdfTemplates/event.hbs');
            _context.next = 3;
            return _event2.default.findById(req.params.eventId).exec();

          case 3:
            event = _context.sent;
            _context.next = 6;
            return _eventHelper2.default.find({ event: event._id, status: _eventHelperConstants.EVENT_HELPER_ACCEPTED }).populate('user').exec();

          case 6:
            helpers = _context.sent;


            event.eventDate = (0, _moment2.default)(event.startDate).format('L');
            event.eventStartTime = (0, _moment2.default)(event.startDate).format('LT');
            event.eventEndTime = (0, _moment2.default)(event.endDate).format('LT');
            event.popHelpers = helpers;

            template = _handlebars2.default.compile(source.toString());
            html = template(event);
            options = {
              format: 'A4',
              footer: {
                contents: {
                  default: '<div style="font-family: Helvetica Neue; font-size: 10px; text-align: center;">Seite {{page}}/{{pages}}</div>'
                }
              }
            };


            _htmlPdf2.default.create(html, options).toFile('./pdf/event' + req.params.eventId + '.pdf', function (err, result) {
              if (err) {
                res.end(err);
              } else {
                res.sendFile(result.filename); // { filename: '/app/businesscard.pdf' }
              }
            });

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function writeEventPDF(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var writeUserPDF = exports.writeUserPDF = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
    var source, user, template, html, today, options;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            source = _fs2.default.readFileSync(__dirname + '/../../pdfTemplates/employee.hbs');
            _context2.next = 3;
            return _user2.default.findById(req.params.userId).populate(['nationality', 'profileImage', 'licenses', 'languages', 'groups']).exec();

          case 3:
            user = _context2.sent;


            if (user.profileImage) {
              user.imageUrl = (0, _s3Media.getFullUrl)('original/' + user.profileImage.filePath);
            }
            user.birthdayFormatted = (0, _moment2.default)(user.birthday).format('L');
            user.createdAtFormatted = (0, _moment2.default)(user.createdAt).format('L');
            user.passportValidUntilFormatted = (0, _moment2.default)(user.passportValidUntil).format('L');
            user.passportValidFromFormatted = (0, _moment2.default)(user.passportValidFrom).format('L');

            template = _handlebars2.default.compile(source.toString());
            html = template(user);
            today = (0, _moment2.default)().format('L');
            options = {
              format: 'A4',
              footer: {
                contents: {
                  default: '<div style="font-family: Helvetica Neue; font-size: 10px; text-align: center;">Seite {{page}}/{{pages}} am ' + today + '</div>'
                }
              }
            };


            _htmlPdf2.default.create(html, options).toFile('./pdf/event' + req.params.eventId + '.pdf', function (err, result) {
              if (err) {
                res.end(err);
              } else {
                res.sendFile(result.filename); // { filename: '/app/businesscard.pdf' }
              }
            });

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function writeUserPDF(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _htmlPdf = require('html-pdf');

var _htmlPdf2 = _interopRequireDefault(_htmlPdf);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _event = require('../models/event');

var _event2 = _interopRequireDefault(_event);

var _eventHelper = require('../models/eventHelper');

var _eventHelper2 = _interopRequireDefault(_eventHelper);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _s3Media = require('./s3Media');

var _eventHelperConstants = require('../constants/eventHelperConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_moment2.default.locale('de');