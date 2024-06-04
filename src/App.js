import React from 'react';
import './App.css';
import { PracticeProvider } from './context/PracticeContext';
import { ValuesProvider } from './context/ValuesContext';
import PlayEntry from './components/PlayEntry';
import PracticeList from './components/PracticeList';
import ManageCustomValues from './components/ManageCustomValues';
import { BrowserRouter, Routes, Route , NavLink } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <PracticeProvider>
    <ValuesProvider>
    <div>
        <nav className="bg-gray-800 p-4">
          <div className="flex justify-left items-center space-x-4" >
          <div className="flex items-center" >
            <img className="h-8 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/0/03/Cal_logo.png" alt="team logo"/>
          </div>
              <ul className="flex space-x-4">
                  <li>
                      <NavLink to="/" className="text-white">Add Practice</NavLink>
                  </li>
                  <li>
                      <NavLink to="/practice-list" className="text-white">Practice List</NavLink>
                  </li>
                  <li>
                      <NavLink to="/customize-values" className="text-white">Customize Values</NavLink>
                  </li>
              </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<PlayEntry/>} />
          <Route path="/practice-list" element={<PracticeList/>} />
          <Route path="/customize-values" element={<ManageCustomValues/>} />
        </Routes>

      </div>
    </ValuesProvider>
    </PracticeProvider>
    </BrowserRouter>
  );
}

export default App;
