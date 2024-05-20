import React from 'react';
import './App.css';
import { PracticeProvider } from './context/PracticeContext';
import AddPractice from './components/AddPractice';

function App() {

  return (
    <PracticeProvider>
      <div className="">
        <AddPractice />
      </div>
    </PracticeProvider>

  );
}

export default App;
