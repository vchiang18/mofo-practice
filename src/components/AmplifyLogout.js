import React from "react";
import { useAuth } from "../context/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
