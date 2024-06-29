import React, { useState, createContext, useContext, useEffect } from "react";
import db from "../db";

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    const fetchSubId = async () => {
      try {
        const subData = await db.subscription.toArray();
        if (subData.length > 0) {
          setSubId(subData[0].stripeSubscriptionId);
          localStorage.setItem("subId", subData[0].stripeSubscriptionId);
        }
      } catch (error) {
        console.error("Failed to fetch subscription", error);
      }
    };
    fetchSubId();
  }, []);

  const saveSubId = async (stripeSubscriptionId) => {
    try {
      await db.subscription.clear();
      await db.subscription.add({ stripeSubscriptionId });
      setSubId(stripeSubscriptionId);
      localStorage.setItem("subId", stripeSubscriptionId);
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
