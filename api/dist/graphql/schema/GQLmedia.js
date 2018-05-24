'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaMethods = require('../../models/methods/mediaMethods');

var types = '\n  type Media {\n    _id: String\n    filePath: String\n    title: String\n    type: String\n    createUser: User\n    updateUser: User\n    project: String\n\n  }\n';

var queries = '\n  allMedia(type:String!,project:String!):[Media]\n';

var mutations = '\n\n';

var resolvers = {
  Query: {
    allMedia: function allMedia(obj, _ref, _ref2) {
      var type = _ref.type,
          project = _ref.project;
      var user = _ref2.user;

      return (0, _mediaMethods.getAllMedia)(type, project, user);
    }
  },
  Mutation: {},
  Media: {}
};

exports.default = { types: types, queries: queries, mutations: mutations, resolvers: resolvers };