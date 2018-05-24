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
      const post =  dummyData.find(entry => entry._id === parseInt(_id, 10));
      console.log(post, _id);
      return post;
    },
    allPosts(obj, {project}, context) {
      // return getAllPosts(project);
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
