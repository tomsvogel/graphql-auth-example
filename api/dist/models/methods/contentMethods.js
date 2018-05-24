'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveContent = exports.getAllContents = exports.getContent = exports.getContentBySlug = undefined;

var getContentBySlug = exports.getContentBySlug = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(slug, project) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _content2.default.findOne({ slug: slug, project: project }).exec();

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getContentBySlug(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getContent = exports.getContent = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _content2.default.findOne({ _id: _id }).exec();

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getContent(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getAllContents = exports.getAllContents = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(project) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _content2.default.find({ project: project }).sort({ slug: 1 }).exec();

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getAllContents(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _prepare = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_id, contextUser) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!_id) {
              _context4.next = 6;
              break;
            }

            _context4.next = 3;
            return getContent(_id);

          case 3:
            return _context4.abrupt('return', _context4.sent);

          case 6:
            return _context4.abrupt('return', new _content2.default({ createUser: contextUser._id }));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function _prepare(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var saveContent = exports.saveContent = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(data, contextUser) {
    var entity;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            _context5.next = 3;
            return _prepare(data._id, contextUser);

          case 3:
            entity = _context5.sent;

            entity = Object.assign(entity, data);
            entity.updateUser = contextUser._id;
            _context5.next = 8;
            return entity.save();

          case 8:
            return _context5.abrupt('return', _context5.sent);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function saveContent(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var _userConstants = require('../../constants/userConstants');

var _authHelpers = require('../../helpers/authHelpers');

var _content = require('../content');

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }