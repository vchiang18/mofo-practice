import React from 'react';
import './App.css';
import { PracticeProvider } from './context/PracticeContext';
import AddPractice from './components/AddPractice';
import PracticeList from './components/PracticeList';

function App() {

  return (
    <PracticeProvider>
      <div className="">
        <AddPractice />
      </div>
      <PracticeList/>
    </PracticeProvider>

  );
}

export default App;
