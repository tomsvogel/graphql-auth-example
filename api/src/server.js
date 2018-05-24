import 'babel-polyfill';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import {router} from './router';
import Logger from './helpers/logger';


const app = express();

Logger.info('Server starting');
// Start the server
let server = app.listen(4000);

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
//FIXES CORS ERROR
const whitelist = [
  'http://localhost:3000'
];
const corsOptions = {
  origin(origin, callback) {
    //SSR origin is undefined
    let originIsWhitelisted = true;
    if(origin !== undefined) {
      const whitelistEntry =  whitelist.find(entry => origin.startsWith(entry));
      originIsWhitelisted = whitelistEntry ? true : false;
    }
    callback(null, originIsWhitelisted);
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With']
};
app.use(cors(corsOptions));
// Import routes to be served
router(app);

export default server;
