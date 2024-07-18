// import React, { useState } from "react";
// import { signUp } from "aws-amplify/auth";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSignup = async () => {
//     try {
//       const { isSignUpComplete, userId, nextStep } = await signUp({
//         username,
//         password,
//         options: {
//           userAttributes: {
//             email,
//             phone_number: phoneNumber,
//           },
//         },
//       });

//       if (isSignUpComplete) {
//         setMessage("Signup complete! You can now log in.");
//       } else {
//         setMessage(`Signup incomplete. Next step: ${nextStep}`);
//       }
//     } catch (error) {
//       console.error("Error signing up:", error);
//       setMessage("Error signing up. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="tel"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         placeholder="Phone Number"
//       />
//       <button onClick={handleSignup}>Signup</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Signup;
