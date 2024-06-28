import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { Navigate } from "react-router-dom";
import { gapi } from "gapi-script";
import store from "=../redux/store";
import { Provider } from "react-redux";
import Routes from "./routes/browserRouter";

const GapiContext = createContext();

export const useGapi = () => {
  return useContext(GapiContext);
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/play-entry" />;
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
    <Provider store={store}>
      <PracticeProvider>
        <ValuesProvider>
          <PlayProvider>
            <UserProvider>
              <GapiContext.Provider value={gapi}>
                <Routes />
              </GapiContext.Provider>
            </UserProvider>
          </PlayProvider>
        </ValuesProvider>
      </PracticeProvider>
    </Provider>
  );
}

export default App;
