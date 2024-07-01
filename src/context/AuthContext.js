import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import axios from "axios";
//import { useGetLicenseQuery } from "../redux/api/netlify";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem("subId");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const subId = localStorage.getItem("subId");
      if (subId) {
        try {
          //const {data, error} = useGetLicenseQuery(subId);
          const response = await axios.post(
            // "https://mofo-dev.netlify.app/.netlify/functions/check-license",
            "https://mofo-alpha.netlify.app/.netlify/functions/check-license",
            { subId },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setIsAuthenticated(response.data.isActive);
          if (!response.data.isActive) {
            localStorage.removeItem("subId");
          }
        } catch (error) {
          console.error("Error checking license: ", error);
          setIsAuthenticated(false);
          localStorage.removeItem("subId");
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

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      logout,
    }),
    [isAuthenticated]
  )

  return (
    <AuthContext.Provider
      value={ contextValue }
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
