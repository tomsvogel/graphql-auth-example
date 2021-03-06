import { dummyData } from '../dummyData';

const types = `
  directive @hasRole(roles: [String]) on QUERY | FIELD | MUTATION

  type Post {
    _id: ID
    title: String
    message: String
  }
`;

const queries = `
  post(_id:ID!):Post @hasRole(roles:["admin"])
  allPosts:[Post] @hasRole(roles:["user","admin"])
`;

const mutations = `
  savePost(
    _id: String
    title: String!
    message: String!
    ):Post @hasRole(role:["admin"])
`;

const resolvers = {
  Query: {
    post(obj, {_id}) {
      console.log('post');
      return dummyData.find(entry => entry._id === parseInt(_id, 10));
    },
    allPosts(obj, args, context) {
      console.log('allPosts');
      return dummyData;
    }
  },
  Mutation: {
    savePost(_, args, context) {
      // return savePost(args, context.user);
    }
  },
  Post: {}
};

export default {types, queries, mutations, resolvers};
