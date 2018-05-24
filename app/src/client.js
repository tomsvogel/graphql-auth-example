import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {onError} from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import ApolloClient from 'apollo-client';

import config from './config';

const httpLink = new HttpLink({uri: config.apiUrl + '/graphql'});

const errorLink = onError(({networkError, graphQLErrors}) => {
  if (networkError && networkError.statusCode === 401) {
    // config.removeAuthToken();
    // window.location.reload();
  console.error(networkError);
  }
});
console.log(config.getAuthHeader());

const authLink = setContext(() => ({headers: {authorization: config.getAuthHeader()}}));

const link = authLink.concat(errorLink).concat(httpLink);

export default new ApolloClient({link, cache: new InMemoryCache()});
