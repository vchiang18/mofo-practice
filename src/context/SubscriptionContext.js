import React, { useState, createContext, useContext, useEffect } from "react";
import db from "../db";
const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    const fetchSubId = async () => {
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
    fetchSubId();
  }, []);

  const saveSubId = async (subId) => {
    try {
      await db.subscription.clear();
      await db.subscription.add({ subId });
      setSubId(subId);
    } catch (error) {
      console.error("Failed to save subscription ID", error);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ subId, saveSubId }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscriptions = () => useContext(SubscriptionContext);
