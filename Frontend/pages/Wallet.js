import React from "react";
import Navbar from "../components/Navbar";
import WalletConnection from "../components/metaMask.js";

const Wallet = () => {
  return (
    <>
      <Navbar />
      <div>
      <WalletConnection />
    </div>
    </>
  );
};

export default Wallet;
