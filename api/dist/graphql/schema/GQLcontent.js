'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _contentMethods = require('../../models/methods/contentMethods');

var _mediaMethods = require('../../models/methods/mediaMethods');

var types = '\n  type Content {\n    _id: String\n    project: String\n    type: String\n    title: String\n    slug: String\n    teaser:String\n    content: JSON\n    attachments: [Media]\n    linkToIndex: Boolean\n    ogImage: Media \n    seoTitle: String\n    seoDescription: String\n    position:Int\n    createUser: User\n    updateUser: User\n  }\n';

var queries = '\n  content(_id:String!):Content\n  contentBySlug(slug:String!, project:String!):Content\n  allContents(project:String):[Content]\n';

var mutations = '\n  saveContent(\n    _id: String\n    project: String!\n    type: String!\n    title: String!\n    slug: String!\n    teaser:String\n    content: JSON! \n    attachments: [String]\n    linkToIndex: Boolean\n    ogImage: String\n    seoTitle: String\n    seoDescription: String\n    position:Int\n    ):Content\n';

var resolvers = {
  Query: {
    content: function content(obj, args) {
      return (0, _contentMethods.getContent)(args._id);
    },
    contentBySlug: function contentBySlug(obj, _ref) {
      var slug = _ref.slug,
          project = _ref.project;

      return (0, _contentMethods.getContentBySlug)(slug, project);
    },
    allContents: function allContents(obj, _ref2) {
      var project = _ref2.project;

      return (0, _contentMethods.getAllContents)(project);
    }
  },
  Mutation: {
    saveContent: function saveContent(_, args, context) {
      return (0, _contentMethods.saveContent)(args, context.user);
    }
  },
  Content: {
    ogImage: function ogImage(content) {
      if (!content.ogImage) return null;
      return (0, _mediaMethods.getMediaById)(content.ogImage);
    },
    attachments: function attachments(message) {
      if (!message.attachments) return [];
      return (0, _mediaMethods.getMediasById)(message.attachments);
    }
  }
};

exports.default = { types: types, queries: queries, mutations: mutations, resolvers: resolvers };