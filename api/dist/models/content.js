'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var getContent = function getContent(content) {
  return JSON.parse(content);
};
var setContent = function setContent(content) {
  return JSON.stringify(content);
};

var ContentSchema = exports.ContentSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  teaser: {
    type: String,
    required: false
  },
  content: {
    type: String,
    set: setContent,
    get: getContent,
    required: true
  },
  linkToIndex: {
    type: Boolean,
    required: false
  },
  seoTitle: {
    type: String,
    required: false
  },
  seoDescription: {
    type: String,
    required: false
  },
  ogImage: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: false
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  }],
  position: {
    type: Number,
    default: 0
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
}, {
  timestamps: true
});

exports.default = _mongoose2.default.model('Content', ContentSchema);