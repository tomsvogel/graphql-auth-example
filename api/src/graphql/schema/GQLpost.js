const types = `
  directive @hasRole(roles: [String]) on QUERY | FIELD | MUTATION

  type Post {
    _id: String
    title: String
    message: String
  }
`;

const queries = `
  post(_id:String!):Post @hasRole(roles:["admin"])
  allPosts(project:String):[Post] @hasRole(roles:["user"])
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
    post(obj, args) {
      return {_id: '23234234', title: 'testmessage', 'message': 'testmessage'};
    },
    allPosts(obj, {project}, context) {
      // return getAllPosts(project);
      return [];
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
