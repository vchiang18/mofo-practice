// https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/

const awsconfig = {
  //   Auth: {
  //     userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  //     userPoolId: process.env.REACT_APP_USER_POOL_ID,
  //     oauth: {
  //       // Optional
  //       domain: "tbd.auth.us-west-2.amazoncognito.com",
  //       scope: [
  //         "openid",
  //         "email",
  //         "phone",
  //         "profile",
  //         "aws.cognito.signin.user.admin",
  //       ],
  //       redirectSignIn: "http://localhost:3000/,https://example.com/",
  //       redirectSignOut: "http://localhost:3000/,https://example.com/",
  //       responseType: "code",
  //     },
  //     username: "true",
  //     email: "false", // Optional
  //     phone: "false", // Optional
  //   },
  // };

  // amplify 5.0
  Auth: {
    // mandatorySignIn: true,
    region: "us-west-2",
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    // oauth: {
    //   domain: "your-cognito-domain.auth.us-west-2.amazoncognito.com",
    //   scope: ["email", "openid", "profile"],
    //   redirectSignIn: "http://localhost:3000/",
    //   redirectSignOut: "http://localhost:3000/",
    //   responseType: "code",
    // },
  },
};

export default awsconfig;
