'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = '\nscalar JSON\n';

var queries = '\n';

var mutations = '\n';

var resolvers = {
  JSON: _graphqlTypeJson2.default
};
exports.default = { types: types, queries: queries, mutations: mutations, resolvers: resolvers };