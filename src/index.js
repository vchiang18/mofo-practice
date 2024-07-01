import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

// // download popup
// const InstallPromptPopup = ({ onInstall, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Install App</h2>
//         <p className="mb-4 text-center">Do you want to install this app?</p>
//         <div className="flex justify-center">
//           <button
//             className="bg-blue-gradient text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={onInstall}
//           >
//             Install
//           </button>
//           <button
//             className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // main component
// const Main = () => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showInstallPrompt, setShowInstallPrompt] = useState(false);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (e) => {
//       e.preventDefault();
//       console.log("beforeinstallprompt event triggered", e); // Debugging log

//       setDeferredPrompt(e);
//       setShowInstallPrompt(true);
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
//     window.dispatchEvent(new Event("beforeinstallprompt"));

//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const handleInstallClick = () => {
//     if (deferredPrompt) {
//       console.log("deferredPrompt object", deferredPrompt);

//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === "accepted") {
//           console.log("User accepted the prompt");
//         } else {
//           console.log("User dismissed the prompt");
//         }
//         setDeferredPrompt(null);
//         setShowInstallPrompt(false);
//       });
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <React.StrictMode>
//         <App />
//         {showInstallPrompt && (
//           <InstallPromptPopup
//             onInstall={handleInstallClick}
//             onClose={() => setShowInstallPrompt(false)}
//           />
//         )}
//       </React.StrictMode>
//     </GoogleOAuthProvider>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Main />);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// Registers SW to work offline
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// Requests persistent storage
if ("storage" in navigator && "persist" in navigator.storage) {
  navigator.storage.persist().then((granted) => {
    if (granted) {
      console.log("Storage will not be cleared except by explicit user action");
    } else {
      console.log("Storage may be cleared by the UA under storage pressure.");
    }
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
