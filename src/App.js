import React from 'react';
import './App.css';
import { PracticeProvider } from './context/PracticeContext';
import AddPractice from './components/AddPractice';
import PracticeList from './components/PracticeList';
import { BrowserRouter, Routes, Route , NavLink } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <PracticeProvider>
    <div>
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <NavLink to="/" className="text-white">Add Practice</NavLink>
                </li>
                <li>
                    <NavLink to="/practice-list" className="text-white">Practice List</NavLink>
                </li>
            </ul>
        </nav>
        <Routes>
          <Route path="/" element={<AddPractice/>} />
          <Route path="/practice-list" element={<PracticeList/>} />
        </Routes>

      </div>
    </PracticeProvider>
    </BrowserRouter>
  );
}

export default App;
