import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {withRouter} from 'react-router';

const ALL_POSTS = gql`
  query allPosts {
    allPosts {
      _id
      title
      message
    }
  }
`;

const AllPosts = ({onPostSelected, auth, history}) => {
  if (auth.isAuthenticated()) {
    return (
      <Query query={ALL_POSTS}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (!data.allPosts.length) {
            return <div> no posts created yet!</div>;
          }

          return (
            <div>
              {data.allPosts.map(post => (
                <div
                  key={post._id}
                  style={{padding: 15, cursor: 'pointer'}}
                  onClick={() => {
                    history.push(`/editPost/${post._id}`);
                  }}>
                  {post._id} - {post.title}
                </div>
              ))}
              <div
                style={{
                  position: 'fixed',
                  bottom: 15,
                  right: 15,
                  padding: 15,
                  cursor: 'pointer',
                  color: 'red',
                  background: 'white',
                }}
                onClick={auth.logout}>
                logout
              </div>
            </div>
          );
        }}
      </Query>
    );
  } else {
    auth.login();
  }
};
export default withRouter(AllPosts);
