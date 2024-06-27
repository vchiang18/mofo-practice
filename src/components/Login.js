import React, { useState } from "react";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [subId, setSubId] = useState("");
  const { saveSubId } = useSubscriptions();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/.netlify/functions/check-license", {
        subId,
      });
      console.log("response: ", response);
      if (response.data.isActive) {
        saveSubId(subId);
        navigate("/");
      } else {
        alert("Your license has expired.");
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
