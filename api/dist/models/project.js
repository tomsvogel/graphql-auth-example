'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ProjectSchema = exports.ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  key: {
    type: String,
    required: true,
    unique: true
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
exports.default = _mongoose2.default.model('Project', ProjectSchema);