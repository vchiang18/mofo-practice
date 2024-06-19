import React, { useState, useContext } from "react";
import { useUsers } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [stripeCustomerId, setStripeCustomerId] = useState("");
  const { user, saveUser } = useUsers();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/.netlify/functions/check-license", {
        stripeCustomerId,
      });
      console.log("response.data.licenseActive: ", response.data.licenseActive);
      if (response.data.licenseActive) {
        saveUser({ stripeCustomerId });
        navigate("/");
      } else {
        alert("Your license has expired.");
      }
    } catch (error) {
      console.error("Error checking license: ", error);
      return false;
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Sign In</h2>
      <input
        type="text"
        value={stripeCustomerId}
        onChange={(e) => setStripeCustomerId(e.target.value)}
        placeholder="Stripe User ID"
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
