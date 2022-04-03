
import './App.css';
import Home from './Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import { ethers } from "ethers";
import { useState } from 'react';
import Organise from './Organise/Organise';

function App() {
  const [web3Signer, setweb3Signer] = useState(null);
  const [account, setaccount] = useState(null);
  const web3Handler = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setaccount(accounts[0]);
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
    setweb3Signer(signer);
  }
  return (
      <BrowserRouter>
      <Navbar web3Handler={web3Handler} account={account}/>
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/organise" element={<Organise />}>
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
