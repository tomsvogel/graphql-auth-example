import {makeExecutableSchema, addErrorLoggingToSchema} from 'graphql-tools';
import {merge} from 'lodash';

import GQLjson from './schema/GQLjson';
import GQLpost from './schema/GQLpost';
import Logger from '../helpers/logger';
import { directiveResolvers } from './directives';

let typeDefsList = [];
let resolversList = [];
let queryList = [];
let mutationList = [];

function addSchema({types, queries, mutations, resolvers}) {
  typeDefsList.push(types);
  resolversList.push(resolvers);
  queryList.push(queries);
  mutationList.push(mutations);
}

addSchema(GQLjson);
addSchema(GQLpost);

const schema = makeExecutableSchema({
  typeDefs: [...typeDefsList, `type Query { ${queryList.join('\n')} }`, `type Mutation { ${mutationList.join('\n')} }`],
  resolvers: merge(...resolversList),
  directiveResolvers
});

const logger = {log: e => Logger.error(e.message)};
addErrorLoggingToSchema(schema, logger);

export default schema;
