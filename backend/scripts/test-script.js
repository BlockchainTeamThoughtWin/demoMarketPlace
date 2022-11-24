// const { Web3 } = require("@project-serum/anchor");
const { ethers } = require("ethers");
const hre = require("hardhat");
const Web3 = require('web3');
const axios = require('axios');

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


const generateSign = async ()=>{

var web3 = new Web3('http://localhost:8545');
// console.log(web3);
let nonce = "1";
    
let signer = await hre.ethers.getSigner()
console.log(signer);

const sign =  web3.eth.sign(nonce,signer.address);

console.log("Sign ",await sign,"\nNonce",nonce,"\nSigner",signer.address);

    // verifyUser(nonce,sign,signer.address);
}


// const verifyUser = async ()=>{
    // let nonce = 1;
    // let signer = hre.ethers.getSigner()
    
    // axios.get('https://f7b0-2401-4900-1c19-2a3-418b-c74e-e5a5-9d62.in.ngrok.io/UserVerification', {
    //     user_address: signer.address,
    //     nonce: nonce,
    //     signature: signature
    //   })
    //   .then(function (response) {
    //     console.log(response,">>>>>>>>>>>>:::");
    //   })
    //   .catch(function (error) {
    //     console.log(error,"error  <<<<<<<<<<<<<<<<<");
    //   });

// }
generateSign();
// verifyUser(nonce, signer);