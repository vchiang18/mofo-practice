import React, { useState } from "react";
// import { Auth } from "aws-amplify";

const AmplifyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    // try {
    //   await Auth.signIn(username, password);
    //   console.log("Successfully signed in");
    // } catch (error) {
    //   console.log("Error signing in", error);
    // }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default AmplifyLogin;
