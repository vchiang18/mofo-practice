import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddPractice from './components/AddPractice';

function App() {

  // this is a callback
  // setTimeout(() => {
  //   console.log('this runs after timer');
  // }, 3000);
  // console.log('this runs before timer completes!')

  // promise object
  // typically APIs give you promises already, do'nt need to create
  // easy to chain on .then, etc
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve('this runs after time is done');
        reject({code: 500, message: 'an error occurred'});
      }, 3000);
  })

  promise.then((text) => {
    console.log(text)
  }).catch((err) => {
    console.log(err.code, err.message)
  })

  // promise.then((text) => {
  //   return text;
  // }, function(err){
  //   console.log(err.code, err.message)
  // }).then((newText) => {
  //   console.log(newText)
  // })

  return (
    <div className="">
      <AddPractice />
    </div>
  );
}

export default App;
