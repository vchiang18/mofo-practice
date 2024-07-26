import React, { createContext, useState, useContext, useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import {
  fetchAuthSession,
  signOut,
  signInWithRedirect,
  getCurrentUser,
} from "aws-amplify/auth";

const AuthContext = createContext(null);

export const useAuthData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthData must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  authCode,
  setAuthCode,
  setIsAuthLoading,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSub, setUserSub] = useState(undefined);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signIn":
          setAuthDetails();
          break;
        case "tokenRefresh":
          setAuthDetails();
          break;
        case "signOut":
          window.location.reload();
          break;
        default:
          break;
      }
    });

    setAuthDetails();

    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    await signInWithRedirect({ provider: "Google" });
  };

  const setAuthDetails = async () => {
    try {
      const session = await fetchAuthSession();
      const tokens = session.getAccessToken().getJwtToken();
      const user = await getCurrentUser();
      const userSub = user.attributes.sub;

      setAuthCode(tokens);
      setUserSub(userSub);
      setIsAuthenticated(!!tokens);
    } catch (error) {
      console.error(error);
    }
    setIsAuthLoading(false);
  };

  const logout = async () => {
    await signOut();
  };

  useEffect(() => {
    setIsAuthLoading(true);
    setAuthDetails()
      .then(() => {
        setIsAuthLoading(false);
      })
      .catch(() => {
        setIsAuthLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authCode,
        logout,
        loginWithGoogle,
        userSub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
