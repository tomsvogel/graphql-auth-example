import 'babel-polyfill';

import {ApolloProvider} from 'react-apollo';
import {Route, Router} from 'react-router-dom';
import React from 'react';

import Auth from './service/auth';
import Callback from './components/Callback';
import EditPost from './components/EditPost';
import Posts from './components/Posts';
import client from './client';
import history from './history';

const auth = new Auth();
const handleAuthentication = props => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication();
  }
};

export default () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <div>
        <Route path="/" exact={true} render={props => <Posts auth={auth} {...props} />} />
        <Route path="/editpost/:id" render={props => <EditPost auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  </ApolloProvider>
);
