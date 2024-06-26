import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { UserProvider } from "./context/SubscriptionContext";
import PlayEntry from "./components/PlayEntry";
import PlayList from "./components/PlayList";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValueSettings from "./components/ValuesSettings";
import { gapi } from "gapi-script";
import Login from "./components/Login";
// import store from "=../redux/store";
// import { Provider } from "react-redux";

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
    // <Provider store={store}>
    <BrowserRouter>
      <PracticeProvider>
        <ValuesProvider>
          <PlayProvider>
            <UserProvider>
              <GapiContext.Provider value={gapi}>
                <div>
                  {<Nav />}
                  <Routes>
                    <Route path="/" element={<PlayEntry />} />
                    <Route path="/play-list" element={<PlayList />} />
                    <Route
                      path="/customize-values"
                      element={<ValueSettings />}
                    />
                    <Route path="/test" element={<Login />} />
                  </Routes>
                </div>
              </GapiContext.Provider>
            </UserProvider>
          </PlayProvider>
        </ValuesProvider>
      </PracticeProvider>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
