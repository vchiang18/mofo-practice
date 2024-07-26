import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { gapi } from "gapi-script";
import store from "./redux/store";
import { Provider } from "react-redux";
import Routes from "./routes/BrowserRouter";
import AuthProvider from "./context/AuthContext";
import { CatchProvider } from "./context/CatchContext";

const GapiContext = createContext();

export const useGapi = () => {
  return useContext(GapiContext);
};

function App() {
  function handleCredentialResponse(response) {
    console.log(response);
  }

  useEffect(() => {
    const initializeGapiClient = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.prompt();
      } else {
        console.error("Google API script not loaded");
      }
    };

    const initClient = () => {
      if (window.gapi) {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
            scope: "https://www.googleapis.com/auth/drive.file",
          })
          .then(() => {
            console.log("GAPI client initialized");
          })
          .catch((error) => {
            console.error("Error initializing GAPI client: ", error);
          });
      } else {
        console.error("GAPI script not loaded");
      }
    };

    const handleLoad = () => {
      initializeGapiClient();
      if (window.gapi) {
        window.gapi.load("client:auth2", initClient);
      }
    };

    if (window.google && window.gapi) {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <AuthProvider>
      <Provider store={store}>
        <PracticeProvider>
          <ValuesProvider>
            <CatchProvider>
              <PlayProvider>
                <GapiContext.Provider value={gapi}>
                  <Routes />
                </GapiContext.Provider>
              </PlayProvider>
            </CatchProvider>
          </ValuesProvider>
        </PracticeProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
