import React, { useState, createContext, useContext, useEffect } from "react";
import db from "../db";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await db.user.toArray();
        if (userData.length > 0) {
          setUser(userData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

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
