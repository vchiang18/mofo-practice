import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

// import { Auth } from "aws-amplify";

const AmplifyLogin = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
};

export default AmplifyLogin;
