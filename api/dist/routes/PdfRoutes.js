'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pdf = require('../service/pdf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _express2.default.Router();

routes.get('/event/:eventId', _pdf.writeEventPDF);
routes.get('/user/:userId', _pdf.writeUserPDF);

exports.default = routes;