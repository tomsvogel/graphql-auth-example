import GraphQLJSON from 'graphql-type-json';

const types = `
scalar JSON
`;


const queries = `
`;

const mutations = `
`;

const resolvers = {
  JSON: GraphQLJSON
};
export default {types, queries, mutations, resolvers};
