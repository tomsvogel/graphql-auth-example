'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userConstants = require('../../constants/userConstants');

var _authHelpers = require('../../helpers/authHelpers');

var _userMethods = require('../../models/methods/userMethods');

var _mediaMethods = require('../../models/methods/mediaMethods');

var types = '\n  type User {\n    _id: String!\n    email: String!\n    active: Boolean!\n    role: String!\n    firstName: String!\n    lastName: String!\n    phone: String\n    profileImage: Media\n    token: String\n  }\n  \n  enum UserStatus {\n    ' + _userConstants.USER_STATUS_NEW + '\n    ' + _userConstants.USER_STATUS_ACTIVE + '\n    ' + _userConstants.USER_STATUS_INACTIVE + '\n  }\n';

var queries = '\n  allUsers(status: UserStatus, group: String): [User]\n  user(_id:String!): User\n  userCount(status: UserStatus): Int!\n  getUserInfo: User\n';

var mutations = '\n  saveUser(\n    _id: String\n    email: String!\n    password: String,\n    active: Boolean\n    role: String!\n    firstName: String!\n    lastName: String!\n    phone: String\n    profileImage:String\n  ): User\n\n  saveUserProfile(\n    _id: String\n    email: String!\n    active: Boolean\n    firstName: String!\n    lastName: String!\n    phone: String\n    profileImage:String\n  ): User\n\n   login(\n      email: String!\n      password: String!\n      pushToken: String\n    ):User\n\n   forgotPassword(\n      email: String!\n    ):Boolean\n\n   changePassword(\n      token: String!\n      password: String!\n    ):Boolean\n\n   registerUser(\n      email: String!\n      password: String!\n      firstName: String!\n      lastName: String!\n      phone: String!\n    ): User \n\n    \n    savePushToken(\n      token: String!\n    ):Boolean\n    \n    visit:Boolean\n';

var resolvers = {
  Query: {
    user: function user(obj, args, context) {
      return (0, _userMethods.getUser)(args._id, context.user);
    },
    allUsers: function allUsers(obj, _ref, _ref2) {
      var status = _ref.status,
          group = _ref.group;
      var user = _ref2.user;

      return (0, _userMethods.getAllUsers)(status, group, user);
    },
    userCount: function userCount(obj, _ref3, _ref4) {
      var status = _ref3.status;
      var user = _ref4.user;

      return (0, _userMethods.getUserCount)(status, user);
    },
    getUserInfo: function getUserInfo(_, args, context) {
      return (0, _userMethods.getUserInfo)(context.user);
    }
  },
  Mutation: {
    saveUser: function saveUser(_, args, context) {
      (0, _authHelpers.permissionCheck)(_userConstants.ROLE_ADMIN, context.user);
      return (0, _userMethods.saveUser)(args, context.user);
    },
    login: function login(_, args) {
      return (0, _userMethods.loginUser)(args);
    },
    forgotPassword: function forgotPassword(_, args) {
      return (0, _userMethods.forgotPassword)(args);
    },
    changePassword: function changePassword(_, args) {
      return (0, _userMethods.changePassword)(args);
    },
    registerUser: function registerUser(_, args) {
      return (0, _userMethods.registerUser)(args);
    },
    saveUserProfile: function saveUserProfile(_, args, _ref5) {
      var user = _ref5.user;

      return (0, _authHelpers.activatedCheck)(user).then(function () {
        return (0, _userMethods.saveUserProfile)(args, user);
      });
    },
    savePushToken: function savePushToken(_, args, context) {
      return (0, _userMethods.savePushToken)(args, context.user);
    },
    visit: function visit(_, __, _ref6) {
      var user = _ref6.user;

      return (0, _authHelpers.activatedCheck)(user).then(function () {
        return (0, _userMethods.updateLatestVisit)(user);
      });
    }
  },
  User: {
    profileImage: function profileImage(_ref7, args) {
      var _profileImage = _ref7.profileImage;

      if (!_profileImage) return null;
      return (0, _mediaMethods.getImageById)(_profileImage, args);
    }
  }
};
exports.default = { types: types, queries: queries, mutations: mutations, resolvers: resolvers };