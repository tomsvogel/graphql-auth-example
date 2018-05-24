'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  return schema.eachPath(function (pathKey, _ref) {
    var instance = _ref.instance;

    if (instance !== 'Date') return;
    schema.virtual(pathKey + 'Timestamp').get(function () {
      if (this[pathKey]) return getTimestamp(this[pathKey]);
      return null;
    }).set(function (timestamp) {
      this.set(pathKey, new Date(timestamp * 1000));
    });
    schema.virtual(pathKey + 'Str').get(function () {
      if (this[pathKey]) return this[pathKey].toISOString();
      return null;
    }).set(function (isoDateStr) {
      this.set(pathKey, new Date(isoDateStr));
    });
  });
};

var getTimestamp = exports.getTimestamp = function getTimestamp(date) {
  return date.getTime() / 1000 | 0;
};