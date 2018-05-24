'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nodeEnvFile2.default)('.env.' + process.env.NODE_ENV);

var config = {
  env: process.env.ENV,
  cloudinaryFolder: 'arkulpa',
  secret: process.env.PASSPHRASE,
  database: process.env.DATABASE_PATH,
  port: process.env.PORT,
  backend: process.env.SERVER,
  endpoint: process.env.SERVER + ':' + process.env.PORT,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    ssl: true
  }
};

exports.default = config;