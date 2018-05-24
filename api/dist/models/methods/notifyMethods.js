'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyAdministration = exports.notifyUsers = undefined;

// const isTestUser = user => user._id.equals(TEST_USER_JONAS) || user._id.equals(TEST_USER_TEST_ARKULPA);


var notifyUsers = exports.notifyUsers = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2, users) {
    var title = _ref2.title,
        text = _ref2.text,
        pushTitle = _ref2.pushTitle,
        pushText = _ref2.pushText;
    var disablePush = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var disableEmail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var emails, pushTokens, promises, batches, i, start, end, batchedEmails;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            emails = [];
            pushTokens = [];

            _logger2.default.log('notify users', title);
            users.forEach(function (user) {
              //check for test user if env isn't production
              if (_main2.default.env === _envConstants.ENV_PROD) {
                _logger2.default.log('Notified: ', user.email);
                if (!disablePush && user.pushTokens) {
                  pushTokens.push.apply(pushTokens, _toConsumableArray(user.pushTokens));
                }
                if (!disableEmail) {
                  emails.push(user.email);
                }
              } else {
                _logger2.default.log('Not notified: ', user.email);
              }
            });

            _logger2.default.log('send Emails', emails.length);
            //double check for less than 3 emails if env isn't production

            if (!(emails.length > 0 && (_main2.default.env === _envConstants.ENV_PROD || emails.length < 3))) {
              _context.next = 12;
              break;
            }

            promises = [];
            batches = Math.ceil(emails.length / EMAIL_BATCH_SIZE);

            if (batches > 1) {
              _logger2.default.info('Emails got batched into ' + batches + ' batches');
            }
            for (i = 0; i < batches; i++) {
              start = i * EMAIL_BATCH_SIZE;
              end = Math.min(emails.length, (i + 1) * EMAIL_BATCH_SIZE);
              batchedEmails = emails.slice(start, end);

              promises.push((0, _mailer.sendEmails)({ bcc: batchedEmails }, { subject: title, text: text }));
            }
            _context.next = 12;
            return Promise.all(promises);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function notifyUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var notifyAdministration = exports.notifyAdministration = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref4) {
    var title = _ref4.title,
        text = _ref4.text;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _mailer.sendEmails)({ to: _main2.default.administrationEmail }, { subject: title, text: text });

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function notifyAdministration(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _mailer = require('../../service/mailer');

var _main = require('../../config/main');

var _main2 = _interopRequireDefault(_main);

var _logger = require('../../helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _envConstants = require('../../constants/envConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var EMAIL_BATCH_SIZE = 100;