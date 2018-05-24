'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = router;

var _apolloErrors = require('apollo-errors');

var _graphqlServerExpress = require('graphql-server-express');

var _schemaPrinter = require('graphql/utilities/schemaPrinter');

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _authHelpers = require('./helpers/authHelpers');

var _mediaMethods = require('./models/methods/mediaMethods');

var _logger = require('./helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _schema = require('./graphql/schema');

var _schema2 = _interopRequireDefault(_schema);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var upload = (0, _multer2.default)({ dest: '/tmp/' });

_cloudinary2.default.config({
  cloud_name: 'arkulpa',
  api_key: '998828591216391',
  api_secret: 'pN0NWUNr6cQsRNcfh1OjoepICxs'
});

process.on('unhandledRejection', function (error) {
  // Won't execute
  _logger2.default.error('unhandledRejection', error.stack);
});

function router(app) {
  var apiRoutes = _express2.default.Router();
  apiRoutes.get('/', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send((0, _schemaPrinter.printSchema)(_schema2.default));
  });

  apiRoutes.use('/graphql', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                req.user = (0, _authHelpers.getUserFromRequest)(req);
                _logger2.default.info(req.user.email);
                next();
              } catch (err) {
                //return same format than apollo
                err = (0, _apolloErrors.formatError)(err);
                if (typeof err === 'string') {
                  err = JSON.parse(err);
                }
                res.json({ errors: [err] });
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(), (0, _graphqlServerExpress.graphqlExpress)(function (req) {
    return {
      formatError: _apolloErrors.formatError,
      schema: _schema2.default,
      context: { user: req.user }
    };
  }));

  //   '/upload',
  //   (req, res, next) => {
  //     try {
  //       req.user = getUserFromRequest(req);
  //     } catch (err) {
  //       Logger.error(err.name, 'fileupload');
  //     }
  //     if (!req.user) {
  //       res.status(403).json({error: 'login required!'});
  //     } else {
  //       next();
  //     }
  //   },
  //   s3upload.array('image', 1),
  //   (req, res) => {
  //     if (req.files.length > 0) {
  //       //TODO save image to DB
  //       saveMedia(req, res);
  //     } else {
  //       res.status(500).json({error: 'failed uploading file'});
  //     },e
  //   }
  // );

  apiRoutes.post('/upload', upload.array('file', 1), function (req, res) {
    try {
      req.user = (0, _authHelpers.getUserFromRequest)(req);
    } catch (err) {
      _logger2.default.error(err.name, 'fileupload');
    }
    if (!req.user) {
      res.status(403).json({ error: 'login required!' });
    } else {
      (function () {
        var filename = _path2.default.parse(req.files[0].originalname).name;
        var cloudinaryPublicId = _main2.default.cloudinaryFolder + '/' + Date.now() + '_' + filename;
        _cloudinary2.default.uploader.upload(req.files[0].path, function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(result) {
            var data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _mediaMethods.saveMedia)(req, res, filename, cloudinaryPublicId, req.query.project);

                  case 2:
                    data = _context2.sent;

                    res.json(data);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function (_x4) {
            return _ref2.apply(this, arguments);
          };
        }(), {
          public_id: cloudinaryPublicId,
          use_filename: true,
          unique_filename: true,
          crop: 'limit',
          width: 1600,
          height: 1600,
          tags: ['for_homepage']
        });
      })();
    }
  });

  app.use('/', apiRoutes);
}