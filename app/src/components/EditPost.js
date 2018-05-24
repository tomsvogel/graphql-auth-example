import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const POST = gql`
  query post($_id:String!) {
    post(_id:$_id) {
      _id
      title
      message
    }
  }
`;

const AllPosts = ({onPostSelected, auth}) => {
  if (!auth.isAuthenticated()) {
    return auth.login();
  }
    return (
      <Query query={POST} variables={{_id:"12121"}}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return <div>{data.post.title}</div>;
        }}
      </Query>
    );
};
export default AllPosts;
