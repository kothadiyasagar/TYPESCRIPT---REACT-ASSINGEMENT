import React from 'react';
import logo from './logo.svg';
import './App.css';
import {From} from './componets/From';
import {useState} from 'react'

function App() {
  const [counter,setcounter]=useState(0)
  return (
    <div className="App">
      <h1>sagar</h1>
      <From/>   
    </div>
  );
}

export default App;