'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserNotAllowedError = exports.DoesNotExistsError = exports.AlreadyExistsError = exports.FetchError = undefined;

var _apolloErrors = require('apollo-errors');

var FetchError = exports.FetchError = (0, _apolloErrors.createError)('FetchError', {
  message: 'error while fetching Data'
});
var AlreadyExistsError = exports.AlreadyExistsError = (0, _apolloErrors.createError)('AlreadyExistsError', {
  message: 'entity already exists'
});
var DoesNotExistsError = exports.DoesNotExistsError = (0, _apolloErrors.createError)('DoesNotExistsError', {
  message: 'entity does not exist'
});
var UserNotAllowedError = exports.UserNotAllowedError = (0, _apolloErrors.createError)('UserNotAllowedError', {
  message: 'Benutzer ist in keiner Gruppe die dem Event zugeteilt ist.'
});