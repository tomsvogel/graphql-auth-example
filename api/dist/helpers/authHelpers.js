'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activatedCheck = undefined;

var activatedCheck = exports.activatedCheck = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref3) {
    var _id = _ref3._id;
    var count;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.count({ _id: _id, active: true });

          case 2:
            count = _context.sent;

            if (!(count < 1)) {
              _context.next = 5;
              break;
            }

            throw new _authErrors.TokenExpiredError();

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function activatedCheck(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.generateAuthToken = generateAuthToken;
exports.getUserFromRequest = getUserFromRequest;
exports.permissionCheck = permissionCheck;
exports.loginCheck = loginCheck;
exports.envCheck = envCheck;

var _main = require('../config/main');

var _main2 = _interopRequireDefault(_main);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authErrors = require('../errors/authErrors');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function generateAuthToken(_ref) {
  var _id = _ref._id,
      firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email,
      phone = _ref.phone,
      role = _ref.role,
      profileImage = _ref.profileImage;

  var tokenUser = { _id: _id, firstName: firstName, lastName: lastName, email: email, phone: phone, role: role, profileImage: profileImage };
  return _jsonwebtoken2.default.sign(tokenUser, _main2.default.secret, {
    expiresIn: 60 * 60 * 24 * 7 // in seconds
  });
}

function getUserFromRequest(req) {
  if (req.headers && req.headers.authorization && req.headers.authorization !== 'null') {
    var authToken = req.headers.authorization.replace('Bearer JWT ', '');
    try {
      return _jsonwebtoken2.default.verify(authToken, _main2.default.secret);
    } catch (err) {
      _logger2.default.error('unable to verify JWT', err.name);
      if (err.name && err.name === 'TokenExpiredError') {
        throw new _authErrors.TokenExpiredError();
      }
      throw new _authErrors.TokenInvalidError();
    }
  }
  return false;
}

function permissionCheck(role, user) {
  if (user.role !== role) {
    throw new _authErrors.PermissionError();
  }
}

function loginCheck(user) {
  if (!user) {
    throw new _authErrors.PermissionError();
  }
}

function envCheck(env) {
  if (_main2.default.env !== env) {
    throw new _authErrors.PermissionError();
  }
}