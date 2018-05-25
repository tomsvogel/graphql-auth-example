import {formatError} from 'apollo-errors';
import {graphqlConnect} from 'apollo-server-express';
import {printSchema} from 'graphql/utilities/schemaPrinter';
import express from 'express';
import jwks from 'jwks-rsa';
import jwt from 'express-jwt';

import Logger from './helpers/logger';
import config from './config';
import schema from './graphql/schema';

console.log(config);
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.auth0SecretUrl
  }),
  issuer: config.auth0IsUserUrl,
  algorithms: ['RS256']
});

export function router(app) {
  const apiRoutes = express.Router();
  apiRoutes.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });


  apiRoutes.use(
    '/graphql',
    jwtCheck,
    async function(req, res, next) {
      req.user.role = req.user['https://example.com/roles'][0];
      Logger.info('user', req.user.email, req.user.role);
      next();
    },
    graphqlConnect(req => {
      return {
        formatError,
        schema,
        context: {user: req.user}
      };
    })
  );


  app.use('/', apiRoutes);
}
