import React, { useState, useEffect } from "react";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [subId, setSubId] = useState("");
  const { saveSubId } = useSubscriptions();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        // process.env.REACT_APP_CHECK_LICENSE_URL,
        "https://mofo-dev.netlify.app/.netlify/functions/check-license",
        {
          subId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("first isAuthenticated: ", isAuthenticated);
      console.log("response: ", response);
      if (response.data.isActive) {
        localStorage.setItem("subId", subId);
        // saveSubId(subId);
        setIsAuthenticated(true);
        console.log("isActive: ", isAuthenticated);
        navigate("/play-entry");
      } else {
        alert(
          "Your license has expired. \nPlease renew your subscription to access the app."
        );
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking license: ", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Sign In</h2>
      <input
        type="text"
        value={subId}
        onChange={(e) => setSubId(e.target.value)}
        placeholder="Subscription ID"
        className="border border-gray-300 rounded px-4 py-2 text-center w-64 m-4"
      />
      <button
        className="rounded bg-calBlue text-white px-2 py-2"
        onClick={handleLogin}
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
