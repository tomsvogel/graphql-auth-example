'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _userConstants = require('../constants/userConstants');

var _logger = require('../helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _createVirtualDateMethods = require('../helpers/createVirtualDateMethods');

var _createVirtualDateMethods2 = _interopRequireDefault(_createVirtualDateMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

//= ===============================
// User Schema
//= ===============================
// Importing Node packages required for schema
var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  new: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: [_userConstants.ROLE_USER, _userConstants.ROLE_ADMIN],
    default: _userConstants.ROLE_USER
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  profileImage: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: false
  },
  createUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updateUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

UserSchema.index({ lastName: 1, firstName: 1 });

//= ===============================
// User ORM Methods
//= ===============================

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.password = (0, _sha2.default)(user.password);
  _logger2.default.info(user.email, 'password changed');
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword) {
  return (0, _sha2.default)(candidatePassword) === this.password;
};

(0, _createVirtualDateMethods2.default)(UserSchema);

exports.default = _mongoose2.default.model('User', UserSchema);