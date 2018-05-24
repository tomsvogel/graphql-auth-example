console.log(process.env);


const TOKEN_IDENTIFIER = 'id_token';

const getConfig = () => ({

  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  apiUrl: process.env.REACT_APP_API_URL,
  thumbBaseUrl: 'https://res.cloudinary.com/arkulpa/image/upload/c_limit,h_100,w_150/',
  getAuthHeader() {
    const authToken = localStorage.getItem(TOKEN_IDENTIFIER);
    return authToken ? `Bearer ${authToken}` : null;
  },
});
export default getConfig();
