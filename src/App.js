import React from "react";
import "./App.css";
import { PracticeProvider } from "./context/PracticeContext";
import { ValuesProvider } from "./context/ValuesContext";
import { PlayProvider } from "./context/PlayContext";
import { HeaderProvider } from "./context/HeaderContext";
import { PeriodPairingsProvider } from "./context/PeriodPairingsContext";
import PlayEntry from "./components/PlayEntry";
import PlayList from "./components/PlayList";
import Nav from "./components/Nav";
import ManageCustomValues from "./components/ManageCustomValues";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PeriodPairingsProvider>
        <PracticeProvider>
          <ValuesProvider>
            <PlayProvider>
              <HeaderProvider>
                <div>
                  {<Nav />}
                  <Routes>
                    <Route path="/" element={<PlayEntry />} />
                    <Route path="/play-list" element={<PlayList />} />
                    <Route
                      path="/customize-values"
                      element={<ManageCustomValues />}
                    />
                    {/* <Route path="/test" element={<PracticeHeader />} /> */}
                  </Routes>
                </div>
              </HeaderProvider>
            </PlayProvider>
          </ValuesProvider>
        </PracticeProvider>
      </PeriodPairingsProvider>
    </BrowserRouter>
  );
}

export default App;
