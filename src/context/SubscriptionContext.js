import React, { useState, createContext, useContext, useEffect } from "react";
import db from "../db";
const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const subData = await db.user.toArray();
        if (subData.length > 0) {
          setSubId(subData[0]);
          localStorage.setItem("subId", subData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const saveUser = async (subData) => {
    await db.user.clear();
    await db.user.add(subData);
    setUser(subData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => useContext(UserContext);
