import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const POST = gql`
  query post($_id: ID!) {
    post(_id: $_id) {
      _id
      title
      message
    }
  }
`;

const AllPosts = ({auth, match}) => {
  if (!auth.isAuthenticated()) {
    return auth.login();
  }
  return (
    <Query query={POST} variables={{_id: match.params.id}}>
      {({loading, error, data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <div style={{padding:15}}>
            <div style={{padding:15}}>id:<br/>{data.post._id}</div>
            <div style={{padding:15}}>title:<br/>{data.post.title}</div>
            <div style={{padding:15}}>message: <br/>{data.post.message}</div>
          </div>
        );
      }}
    </Query>
  );
};
export default AllPosts;
