import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = ({web3Handler,account}) => {
  return (
    <div className='navBarWrapper'>
        <div className='logoWrapper'></div>
        <div className='linkWrapper'>
            <Link to="/">Home</Link>
            <Link to="/">Events</Link>
            <Link to="/organise">Organise</Link>
            <Link to="/">Profile</Link>
        </div>
        <div className='buttonWrapper'>
          {account? (<div className='accountWrapper'>{account.slice(0, 5) + '...' + account.slice(38, 42)}</div>):(
            <button onClick={(e)=>web3Handler(e)} className='buttonConnect'>Connect to Wallet</button>
          )}
            
        </div>
    </div>
  )
}

export default Navbar