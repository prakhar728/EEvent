
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
import Loading from './Loading/Loading';
import Events from '../contractsData/Events.json';
import EventsAddress from '../contractsData/Events-address.json';
import NFT from '../contractsData/NFT.json';
import NFTAddress from '../contractsData/NFT-address.json';

function App() {
  const [web3Signer, setweb3Signer] = useState(null);
  const [account, setaccount] = useState(null);
  const [loading, setloading] = useState(true);
  const [eventsContract, seteventsContract] = useState(null);
  const [nftContract, setnftContract] = useState(null);
  const web3Handler = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setaccount(accounts[0]);
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
    setweb3Signer(signer);
    loadContracts(signer);
  }
  const loadContracts = async(signer) =>{
    const Event = new ethers.Contract(EventsAddress.address,Events.abi,signer);
    console.log(Event);
    seteventsContract(Event);
    const nft = new ethers.Contract(NFTAddress.address,NFT.abi,signer);
    console.log(nft);
    setnftContract(nft);
    setloading(false);
  }
  return (
      <BrowserRouter>
      <Navbar web3Handler={web3Handler} account={account}/>
      {loading? (<Loading message='Waiting for Wallet Connection' />):(
        <Routes>
      <Route path="/" element={<Home nftContract={nftContract} eventsContract={eventsContract} />}>
      </Route>
      <Route path="/organise" element={<Organise nftContract={nftContract} eventsContract={eventsContract} />}>
        </Route>
    </Routes>
      )}
    
  </BrowserRouter>
  );
}

export default App;
