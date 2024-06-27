import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import PlayEntry from "./components/PlayEntry";
import PlayList from "./components/PlayList";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ValueSettings from "./components/ValuesSettings";
import { gapi } from "gapi-script";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import store from "=../redux/store";
// import { Provider } from "react-redux";

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
    // <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <PracticeProvider>
          <ValuesProvider>
            <PlayProvider>
              <SubscriptionProvider>
                <GapiContext.Provider value={gapi}>
                  <div>
                    <Nav />
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route
                        path="/play-entry"
                        element={
                          <PrivateRoute>
                            <PlayEntry />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/play-list"
                        element={
                          <PrivateRoute>
                            <PlayList />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/customize-values"
                        element={
                          <PrivateRoute>
                            <ValueSettings />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/test" element={<Login />} />
                    </Routes>
                  </div>
                </GapiContext.Provider>
              </SubscriptionProvider>
            </PlayProvider>
          </ValuesProvider>
        </PracticeProvider>
      </BrowserRouter>
    </AuthProvider>

    // </Provider>
  );
}

export default App;
