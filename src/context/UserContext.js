import React, { useState, createContext, useContext } from "react";
import db from "../db";
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const saveUser = async (userData) => {
    await db.user.clear();
    await db.user.add(userData);
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => useContext(UserContext);
