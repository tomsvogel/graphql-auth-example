'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveMedia = exports.getAllImages = exports.getAllMedia = exports.getAllDocuments = exports.getDocumentsById = exports.getImageById = exports.getImagesById = exports.getMediasByType = exports.getMediaById = exports.getMediasById = undefined;

var getMediasById = exports.getMediasById = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mediaIds) {
    var inlist;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inlist = mediaIds.map(function (mediaId) {
              return _mongoose2.default.Types.ObjectId(mediaId);
            });
            _context.next = 3;
            return _media2.default.find({ _id: { $in: inlist } }).exec();

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMediasById(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getMediaById = exports.getMediaById = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mediaId) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _media2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(mediaId) }).exec();

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMediaById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getMediasByType = exports.getMediasByType = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(type, project) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _media2.default.find({ type: type, project: project }).sort({ createdAt: -1 }).exec();

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getMediasByType(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getImagesById = exports.getImagesById = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(mediaIds) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getMediasById(mediaIds);

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getImagesById(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var getImageById = exports.getImageById = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(mediaId) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getMediaById(mediaId);

          case 2:
            return _context5.abrupt('return', _context5.sent);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getImageById(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var getDocumentsById = exports.getDocumentsById = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(mediaIds) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getMediasById(mediaIds);

          case 2:
            return _context6.abrupt('return', _context6.sent);

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getDocumentsById(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var getAllDocuments = exports.getAllDocuments = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(project, contextUser) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            _context7.next = 3;
            return getMediasByType(_mediaConstants.MEDIA_PDF, project);

          case 3:
            return _context7.abrupt('return', _context7.sent);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getAllDocuments(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

var getAllMedia = exports.getAllMedia = function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(type, project, contextUser) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            _context8.next = 3;
            return getMediasByType(type, project);

          case 3:
            return _context8.abrupt('return', _context8.sent);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getAllMedia(_x10, _x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

var getAllImages = exports.getAllImages = function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(project, contextUser) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, contextUser);
            _context9.next = 3;
            return getMediasByType(_mediaConstants.MEDIA_IMAGE, project);

          case 3:
            return _context9.abrupt('return', _context9.sent);

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function getAllImages(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

var saveMedia = exports.saveMedia = function () {
  var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(req, res, filename, cloudinaryFilePath, project) {
    var type, mediaType, entity, userId;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            type = _mediaConstants.MEDIA_OTHER;

            if (req.files[0].mimetype.includes('image')) {
              type = _mediaConstants.MEDIA_IMAGE;
              mediaType = req.query.mediaType;

              if (mediaType === _mediaConstants.MEDIA_PROFILE_IMAGE) {
                type = mediaType;
              }
            }
            entity = new _media2.default({ title: filename, type: type, filePath: cloudinaryFilePath });

            entity.createUser = req.user._id;
            entity.updateUser = req.user._id;
            entity.project = project;
            _context10.next = 8;
            return entity.save();

          case 8:
            if (!(type === _mediaConstants.MEDIA_PROFILE_IMAGE)) {
              _context10.next = 12;
              break;
            }

            userId = req.user.role === _userConstants.ROLE_ADMIN && req.query.userId ? req.query.userId : req.user._id;
            _context10.next = 12;
            return updateUserImage(userId, entity._id);

          case 12:
            if (type === _mediaConstants.MEDIA_PROFILE_IMAGE) {
              type = _mediaConstants.MEDIA_IMAGE;
            }
            return _context10.abrupt('return', { _id: entity._id, filePath: cloudinaryFilePath, type: type, title: filename, project: project });

          case 14:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function saveMedia(_x15, _x16, _x17, _x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

var updateUserImage = function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(userId, imageId) {
    var user;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _user2.default.findById(userId).exec();

          case 2:
            user = _context11.sent;

            user.profileImage = imageId;
            _context11.next = 6;
            return user.save();

          case 6:
            return _context11.abrupt('return', user);

          case 7:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function updateUserImage(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

var _cloudinary = require('cloudinary');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mediaConstants = require('../../constants/mediaConstants');

var _userConstants = require('../../constants/userConstants');

var _authHelpers = require('../../helpers/authHelpers');

var _media = require('../media');

var _media2 = _interopRequireDefault(_media);

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }