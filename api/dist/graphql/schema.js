'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _lodash = require('lodash');

var _GQLcontent = require('./schema/GQLcontent');

var _GQLcontent2 = _interopRequireDefault(_GQLcontent);

var _GQLproject = require('./schema/GQLproject');

var _GQLproject2 = _interopRequireDefault(_GQLproject);

var _GQLmedia = require('./schema/GQLmedia');

var _GQLmedia2 = _interopRequireDefault(_GQLmedia);

var _GQLuser = require('./schema/GQLuser');

var _GQLuser2 = _interopRequireDefault(_GQLuser);

var _GQLjson = require('./schema/GQLjson');

var _GQLjson2 = _interopRequireDefault(_GQLjson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefsList = [];
var resolversList = [];
var queryList = [];
var mutationList = [];

function addSchema(_ref) {
  var types = _ref.types,
      queries = _ref.queries,
      mutations = _ref.mutations,
      resolvers = _ref.resolvers;

  typeDefsList.push(types);
  resolversList.push(resolvers);
  queryList.push(queries);
  mutationList.push(mutations);
}

addSchema(_GQLjson2.default);
addSchema(_GQLuser2.default);
addSchema(_GQLmedia2.default);
addSchema(_GQLproject2.default);
addSchema(_GQLcontent2.default);

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [].concat(typeDefsList, ['type Query { ' + queryList.join('\n') + ' }', 'type Mutation { ' + mutationList.join('\n') + ' }']),
  resolvers: _lodash.merge.apply(undefined, resolversList)
});

var logger = { log: function log(e) {
    return console.error(e.message);
  } };
(0, _graphqlTools.addErrorLoggingToSchema)(schema, logger);

exports.default = schema;