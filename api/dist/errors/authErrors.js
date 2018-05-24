'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordTokenExpiredError = exports.TokenInvalidError = exports.TokenExpiredError = exports.UserNotActivatedError = exports.UserExistsError = exports.PasswordError = exports.UsernameError = exports.PermissionError = exports.AuthError = undefined;

var _apolloErrors = require('apollo-errors');

var AuthError = exports.AuthError = (0, _apolloErrors.createError)('AuthError', {
  message: 'Dies ist nur eingelogged möglich.'
});
var PermissionError = exports.PermissionError = (0, _apolloErrors.createError)('PermissionError', {
  message: 'Hierfür ist eine höhere Berechtigung erforderlich.'
});
var UsernameError = exports.UsernameError = (0, _apolloErrors.createError)('UsernameError', {
  message: 'Es existiert kein Benutzer mit dieser Email.'
});
var PasswordError = exports.PasswordError = (0, _apolloErrors.createError)('PasswordError', {
  message: 'Das eingegebene Passwort ist nicht korrekt.'
});
var UserExistsError = exports.UserExistsError = (0, _apolloErrors.createError)('UserExistsError', {
  message: 'Ein Benutzer mit dieser Email existiert bereits.'
});
var UserNotActivatedError = exports.UserNotActivatedError = (0, _apolloErrors.createError)('UserNotActivatedError', {
  message: 'Der Benutzer ist nicht aktiviert!'
});
var TokenExpiredError = exports.TokenExpiredError = (0, _apolloErrors.createError)('TokenExpiredError', {
  message: 'User Token ist abgelaufen!'
});
var TokenInvalidError = exports.TokenInvalidError = (0, _apolloErrors.createError)('TokenInvalidError', {
  message: 'User Token ist nicht gültig!'
});
var ResetPasswordTokenExpiredError = exports.ResetPasswordTokenExpiredError = (0, _apolloErrors.createError)('ResetPasswordTokenExpiredError', {
  message: 'Ihr Token für das Zurücksetzen Ihres Passworts ist abgelaufen. ' + 'Wählen Sie die Option zum Zurücksetzen erneut um den Vorgang neu zu starten.'
});