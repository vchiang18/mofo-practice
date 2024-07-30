// aws-exports.js
const awsconfig = {
  Auth: {
    region: "us-west-2",
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  },
};

export default awsconfig;
