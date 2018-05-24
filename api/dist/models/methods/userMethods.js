'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = exports.updateLatestVisit = exports.savePushToken = exports.saveUserProfile = exports.changePassword = exports.forgotPassword = exports.registerUser = exports.loginUser = exports.saveUser = exports.getUser = exports.getUserCount = exports.getAllUsers = undefined;

var getAllUsers = exports.getAllUsers = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(status, group, contextUser) {
    var userQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            userQuery = getUsersQueryAccordingToStatus(status);

            if (group) {
              userQuery.groups = group;
            }
            _context.next = 5;
            return _user2.default.find(userQuery).sort({ lastName: 1, firstName: 1 }).exec();

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAllUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getUserCount = exports.getUserCount = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(status, contextUser) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            _context2.next = 3;
            return _user2.default.find(getUsersQueryAccordingToStatus(status)).count();

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getUserCount(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getUser = exports.getUser = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_id, contextUser) {
    var permissionCheckRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = void 0;

            if (!(permissionCheckRequired && _id !== contextUser._id && contextUser.role !== _userConstants.ROLE_ADMIN)) {
              _context3.next = 3;
              break;
            }

            throw new _authErrors.PermissionError('permission-error-fetching-user');

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _user2.default.findById(_id).exec();

          case 6:
            user = _context3.sent;
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](3);

            _logger2.default.error(_context3.t0);
            throw new _dbErrors.FetchError();

          case 13:
            return _context3.abrupt('return', user);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 9]]);
  }));

  return function getUser(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var saveUser = exports.saveUser = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(data, contextUser) {
    var entity, existingUser, userGotActivated;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            entity = void 0;

            if (!data._id) {
              _context4.next = 7;
              break;
            }

            _context4.next = 4;
            return getUser(data._id, contextUser);

          case 4:
            entity = _context4.sent;
            _context4.next = 13;
            break;

          case 7:
            _context4.next = 9;
            return _user2.default.findOne({ email: data.email }).exec();

          case 9:
            existingUser = _context4.sent;

            if (!existingUser) {
              _context4.next = 12;
              break;
            }

            throw new _authErrors.UserExistsError();

          case 12:
            entity = new _user2.default();

          case 13:
            data = prepareDataBeforeSave(data);
            if (data._id == null || data._id === '') {
              delete data._id;
            }
            userGotActivated = data.active && !entity.active;

            data.new = false;
            entity = Object.assign(entity, data);
            _context4.next = 20;
            return entity.save();

          case 20:
            entity = _context4.sent;

            if (userGotActivated) {
              (0, _notifyMethods.notifyUsers)((0, _UserMessages.ActivateMessage)(), [entity], true);
            }
            return _context4.abrupt('return', entity);

          case 23:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function saveUser(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var loginUser = exports.loginUser = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(data) {
    var user, passwordMatch, userInfo;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user2.default.findOne({ email: data.email.toLowerCase() }).exec();

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 5;
              break;
            }

            throw new _authErrors.UsernameError();

          case 5:
            if (!(user.active === false)) {
              _context5.next = 7;
              break;
            }

            throw new _authErrors.UserNotActivatedError();

          case 7:
            passwordMatch = user.comparePassword(data.password);

            if (!passwordMatch) {
              _context5.next = 12;
              break;
            }

            userInfo = (0, _authHelpers.setUserInfo)(user);

            userInfo.token = 'JWT ' + (0, _authHelpers.generateAuthToken)(userInfo);
            return _context5.abrupt('return', userInfo);

          case 12:
            throw new _authErrors.PasswordError();

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function loginUser(_x11) {
    return _ref5.apply(this, arguments);
  };
}();

var registerUser = exports.registerUser = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(data) {
    var existingUser, entity, userInfo;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = prepareDataBeforeSave(data);
            _context6.next = 3;
            return _user2.default.findOne({ email: data.email }).exec();

          case 3:
            existingUser = _context6.sent;

            if (!existingUser) {
              _context6.next = 6;
              break;
            }

            throw new _authErrors.UserExistsError();

          case 6:
            data.new = true;
            entity = new _user2.default(data);
            _context6.next = 10;
            return entity.save();

          case 10:
            entity = _context6.sent;
            userInfo = (0, _authHelpers.setUserInfo)(entity);

            userInfo.token = 'JWT ' + (0, _authHelpers.generateAuthToken)(userInfo);
            return _context6.abrupt('return', userInfo);

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function registerUser(_x12) {
    return _ref6.apply(this, arguments);
  };
}();

var forgotPassword = exports.forgotPassword = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(_ref8) {
    var email = _ref8.email;
    var existingUser, buffer, resetToken;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user2.default.findOne({ email: email.toLowerCase() });

          case 2:
            existingUser = _context7.sent;

            if (existingUser) {
              _context7.next = 5;
              break;
            }

            throw new _authErrors.UsernameError();

          case 5:

            // If user is found, generate and save resetToken

            // Generate a token with Crypto
            buffer = _crypto2.default.randomBytes(48);
            resetToken = buffer.toString('hex');


            existingUser.resetPasswordToken = resetToken;
            existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            _context7.next = 11;
            return existingUser.save();

          case 11:
            _context7.next = 13;
            return (0, _notifyMethods.notifyUsers)((0, _UserMessages.ForgotPasswordMessage)(resetToken), [existingUser], true);

          case 13:
            return _context7.abrupt('return', true);

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function forgotPassword(_x13) {
    return _ref7.apply(this, arguments);
  };
}();

var changePassword = exports.changePassword = function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(_ref10) {
    var token = _ref10.token,
        password = _ref10.password;
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user2.default.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).exec();

          case 2:
            user = _context8.sent;

            if (user) {
              _context8.next = 5;
              break;
            }

            throw new _authErrors.ResetPasswordTokenExpiredError();

          case 5:

            // Otherwise, save new password and clear resetToken from database
            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            _context8.next = 10;
            return user.save();

          case 10:
            _context8.next = 12;
            return (0, _notifyMethods.notifyUsers)((0, _UserMessages.PasswordChangedMessage)(), [user], true);

          case 12:
            return _context8.abrupt('return', true);

          case 13:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function changePassword(_x14) {
    return _ref9.apply(this, arguments);
  };
}();

var saveUserProfile = exports.saveUserProfile = function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(data, contextUser) {
    var user, userInfo;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _user2.default.findById(contextUser._id).exec();

          case 2:
            user = _context9.sent;

            data = prepareDataBeforeSave(data);
            user = Object.assign(user, data);
            _context9.next = 7;
            return user.save();

          case 7:
            userInfo = (0, _authHelpers.setUserInfo)(user);

            user.token = 'JWT ' + (0, _authHelpers.generateAuthToken)(userInfo);
            return _context9.abrupt('return', user);

          case 10:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function saveUserProfile(_x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}();

var savePushToken = exports.savePushToken = function () {
  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(_ref13, contextUser) {
    var token = _ref13.token;
    var user;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _user2.default.findById(contextUser._id).exec();

          case 2:
            user = _context10.sent;

            if (!user.pushTokens) {
              user.pushTokens = [];
            }

            if (user.pushTokens.includes(token)) {
              _context10.next = 8;
              break;
            }

            user.pushTokens.push(token);
            _context10.next = 8;
            return user.save();

          case 8:
            return _context10.abrupt('return', true);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function savePushToken(_x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var updateLatestVisit = exports.updateLatestVisit = function () {
  var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(contextUser) {
    var user;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _user2.default.findById(contextUser._id).exec();

          case 2:
            user = _context11.sent;

            if (user) {
              _context11.next = 5;
              break;
            }

            throw new _dbErrors.DoesNotExistsError();

          case 5:
            user.latestVisit = new Date();
            _context11.next = 8;
            return user.save();

          case 8:
            return _context11.abrupt('return', true);

          case 9:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function updateLatestVisit(_x19) {
    return _ref14.apply(this, arguments);
  };
}();

var getUserInfo = exports.getUserInfo = function () {
  var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(contextUser) {
    var user, userInfo;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            user = void 0;
            _context12.next = 3;
            return _user2.default.findOne({ _id: contextUser._id }).exec();

          case 3:
            user = _context12.sent;

            if (user) {
              _context12.next = 6;
              break;
            }

            return _context12.abrupt('return', undefined);

          case 6:
            userInfo = (0, _authHelpers.setUserInfo)(user);

            userInfo.token = 'JWT ' + (0, _authHelpers.generateAuthToken)(userInfo);
            return _context12.abrupt('return', userInfo);

          case 9:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function getUserInfo(_x20) {
    return _ref15.apply(this, arguments);
  };
}();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _UserMessages = require('../../messages/UserMessages');

var _dbErrors = require('../../errors/dbErrors');

var _userConstants = require('../../constants/userConstants');

var _authErrors = require('../../errors/authErrors');

var _notifyMethods = require('./notifyMethods');

var _authHelpers = require('../../helpers/authHelpers');

var _logger = require('../../helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var prepareDataBeforeSave = function prepareDataBeforeSave(data) {
  if (data.password === '') {
    delete data.password;
  }
  return data;
};

function getUsersQueryAccordingToStatus(status) {
  switch (status) {
    case _userConstants.USER_STATUS_NEW:
      return { new: true };
    case _userConstants.USER_STATUS_ACTIVE:
      return { active: true };
    case _userConstants.USER_STATUS_INACTIVE:
      return { active: false };
    default:
      return {};
  }
}