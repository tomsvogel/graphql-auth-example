'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _languageMethods = require('../../models/methods/languageMethods');

var types = '\n type Project {\n    _id: String\n    key: String\n    name: String\n  }\n  ';

var queries = '\n  allProjects: [Project]\n  project(_id:String!): Project\n';

var mutations = '\n  saveProject(\n    _id: String\n    name: String!\n    key: String!\n  ): Project\n';

var resolvers = {
  Query: {
    allProjects: function allProjects() {
      return (0, _languageMethods.getAllProjects)();
    },
    project: function project(_, data, context) {
      return (0, _languageMethods.getProjectById)(data._id, context.user);
    }
  },
  Mutation: {
    saveProject: function saveProject(_, args, context) {
      return (0, _languageMethods.saveProject)(args, context.user);
    }
  },
  Project: {}
};

exports.default = { types: types, queries: queries, mutations: mutations, resolvers: resolvers };