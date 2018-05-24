'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mediaConstants = require('../constants/mediaConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MediaSchema = exports.MediaSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [_mediaConstants.MEDIA_OTHER, _mediaConstants.MEDIA_IMAGE],
    default: _mediaConstants.MEDIA_IMAGE
  },
  filePath: {
    type: String,
    required: true
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
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

exports.default = _mongoose2.default.model('Media', MediaSchema);