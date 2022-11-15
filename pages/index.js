import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import WalletConnection from "../components/metaMask.js";
import React from 'react'

const Home = () => {
  return (
    <div>
      <WalletConnection />
    </div>
  )
}

export default Home
//Adding Comments

