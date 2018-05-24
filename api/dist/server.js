'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _router = require('./router');

var _logger = require('./helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('events').EventEmitter.prototype._maxListeners = 20;

var app = (0, _express2.default)();

_logger2.default.info('Server starting');
// Database Setup
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_main2.default.database);

// Start the server
var server = app.listen(_main2.default.port);

// Setting up basic middleware for all Express requests
app.use(_bodyParser2.default.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(_bodyParser2.default.json()); // Send JSON responses
app.use((0, _morgan2.default)('dev')); // Log requests to API using morgan
//FIXES CORS ERROR
var whitelist = [
// Allow domains here
'http://localhost:3000', 'http://localhost:5000', 'http://localhost:80', 'https://www.arkulpa.at', 'https://content.arkulpa.at'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(_origin) !== -1;
    callback(null, originIsWhitelisted);
  },

  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With']
};
app.use((0, _cors2.default)(corsOptions));
// Import routes to be served
(0, _router.router)(app);

exports.default = server;