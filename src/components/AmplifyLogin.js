import React, { useState } from "react";
import { signIn } from "aws-amplify/auth";
// import { useAuth } from "../context/AuthProvider";

const AmplifyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // const { login } = useAuth();

  // const handleLogin = async () => {
  //   try {
  //     await login(username, password);
  //   } catch (error) {
  //     console.error("Login failed: ", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(username, password);
      console.log("Sign in successful", user);
    } catch (err) {
      console.error("Error signing in", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );

  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <input
  //       type="text"
  //       placeholder="Username"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <button onClick={handleLogin}>Login</button>
  //   </div>
  // );
};

export default AmplifyLogin;
