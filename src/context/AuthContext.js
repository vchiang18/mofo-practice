import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const subId = localStorage.getItem("subId");
      if (subId) {
        try {
          const response = await axios.post(
            "https://mofo-dev.netlify.app/.netlify/functions/check-license",
            { subId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setIsAuthenticated(response.data.isActive);
        } catch (error) {
          console.error("Error checking license: ", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkSubscriptionStatus(); //initial check
    const intervalId = setInterval(
      checkSubscriptionStatus,
      24 * 60 * 60 * 1000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log("Auth context isAuthenticated: ", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
