import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { Navigate } from "react-router-dom";
import { gapi } from "gapi-script";
import store from "./redux/store";
import { Provider } from "react-redux";
import Routes from "./routes/BrowserRouter";
import AuthProvider from "./context/AuthContext";

const GapiContext = createContext();

export const useGapi = () => {
  return useContext(GapiContext);
};


function App() {
  useEffect(() => {
    const initClient = () => {
      gapi.client
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
    };
    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <AuthProvider>
    <Provider store={store}>
      <PracticeProvider>
        <ValuesProvider>
          <PlayProvider>
              <GapiContext.Provider value={gapi}>
                <Routes />
              </GapiContext.Provider>
          </PlayProvider>
        </ValuesProvider>
      </PracticeProvider>
    </Provider>
    </AuthProvider>
  );
}

export default App;
