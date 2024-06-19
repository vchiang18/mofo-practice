import React, { createContext, useContext, useEffect } from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import PlayEntry from "./components/PlayEntry";
import PlayList from "./components/PlayList";
import Nav from "./components/Nav";
import ManageCustomValues from "./components/ManageCustomValues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValueSettings from "./components/ValuesSettings";
import { gapi } from "gapi-script";

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
    <BrowserRouter>
      <PracticeProvider>
        <ValuesProvider>
          <PlayProvider>
            <GapiContext.Provider value={gapi}>
              <div>
                {<Nav />}
                <Routes>
                  <Route path="/" element={<PlayEntry />} />
                  <Route path="/play-list" element={<PlayList />} />
                  <Route path="/customize-values" element={<ValueSettings />} />
                  <Route path="/test" element={<ManageCustomValues />} />
                </Routes>
              </div>
            </GapiContext.Provider>
          </PlayProvider>
        </ValuesProvider>
      </PracticeProvider>
    </BrowserRouter>
  );
}

export default App;
