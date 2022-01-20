import React, { Component } from 'react'
import './App.css';
import {Header} from './Header.js';
import WalletCard from './WalletCard';
import WalletCardEthers from'./WalletCardEthers';

function App() {

  return (
    <div className="App">
      <Header/>
    <WalletCard/>
    <WalletCardEthers/>
    </div>
  );
}

export default App;
