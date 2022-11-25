import React from 'react'
import { ethers } from "ethers";
import Web3 from "web3";

let web3;

export const Sign = async (erc721Address, tokenID, tokenURI , nftPrice, erc20Address, account,nonce,provider) => {
web3 = new Web3(provider) ;
debugger   

const ERC721 = "0x10E457129b4F5F35EdaC901AC669333a887C1513"
const ERC20 = "0x12A98122E956Bbf3535523Ac9A2C178E3E2af325"

let message = ethers.utils.solidityPack(
    ["address", "uint256", "string", "address", "uint256", "uint256"],
    [ERC721, tokenID, tokenURI, ERC20, nftPrice, nonce]
)
let messageHash = ethers.utils.keccak256(message);
let sign = await web3.eth.sign(messageHash,account);
console.log(sign);
return sign;

}
