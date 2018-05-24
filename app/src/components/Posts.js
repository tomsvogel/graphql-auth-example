import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const ALL_POSTS = gql`
  query allPosts {
    allPosts {
      _id
      title
      message
    }
  }
`;

const AllPosts = ({onPostSelected, auth}) => {
  console.log(auth);
  if (auth.isAuthenticated()) {
    return (
      <Query query={ALL_POSTS}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if(!data.allPosts.length){
            return <div> no posts created yet!</div>;
          }

          return <div>{data.allPosts(post => <div key={post._id} onClick={() => onPostSelected(post._id)} />)}</div>;
        }}
      </Query>
    );
  } else {
    auth.login();
  }
};
export default AllPosts;
