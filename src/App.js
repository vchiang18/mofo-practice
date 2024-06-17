import React from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import PlayEntry from "./components/PlayEntry";
import PlayList from "./components/PlayList";
import Nav from "./components/Nav";
import ManageCustomValues from "./components/ManageCustomValues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExportPractices from "./components/ExportPractices";
import ValueSettings from "./components/ValuesSettings";

function App() {
  return (
    <BrowserRouter>
      <PracticeProvider>
        <ValuesProvider>
          <PlayProvider>
            <div>
              {<Nav />}
              <Routes>
                <Route path="/" element={<PlayEntry />} />
                <Route path="/play-list" element={<PlayList />} />
                <Route
                  path="/customize-values"
                  element={<ManageCustomValues />}
                />
                <Route path="/export-practices" element={<ExportPractices />} />
                <Route path="/test" element={<ValueSettings />} />
              </Routes>
            </div>
          </PlayProvider>
        </ValuesProvider>
      </PracticeProvider>
    </BrowserRouter>
  );
}

export default App;
