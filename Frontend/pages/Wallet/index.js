import React from "react";
import Navbar from "../../components/Navbar";
import Web3 from 'web3'; 

const Wallet = () => {




  //current provider is the provider injected by MetaMask 
  let web3;
  
  //typeof is used to check if window is defined 
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    //Connect metamask to the webapp 
    window.ethereum.enable(); 
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider( 'https://ropsten.infura.io/v3/KEY');
    web3 = new Web3(provider);
  } 
  

  
  return (
    <>
      <Navbar />
      <div>Wallet</div>
    </>
  );
};

export default Wallet;
