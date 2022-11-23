import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import WalletNavbar from "../components/WalletNavbar";
import WalletConnectModal from "../components/WalletConnectModal";
import { styled } from "@material-ui/core";
import style from "../styles/Connect.module.css"

const tokenID = () => {

  
  const handleClose = () => setShow(false);

  const [currentChainId, setCurrentChainId] = useState();
  const router = useRouter();
  const tokenID = router.query.tokenID;
  const { activate } =
  useWeb3React();
 
  return (
    <>
      <Navbar />
    

     { !activate ? <WalletConnectModal  show ={true} handleClose={handleClose} currentChainId={currentChainId}/>: null}
     {/* <WalletNavbar/> */}
     {/* <WalletConnectModal/>
     Please Connect to MetaMask Wallet 
     <WalletNavbar/> */}
  
      

    </>
  );
};

export default tokenID;
