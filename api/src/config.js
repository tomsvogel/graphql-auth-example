import env from 'node-env-file';

env('.env');

const config = {
  auth0SecretUrl: process.env.AUTH0_SECRET_URL,
  auth0IsUserUrl: process.env.AUTH0_IS_USER_URL
};

export default config;
