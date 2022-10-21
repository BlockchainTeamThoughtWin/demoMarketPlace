const { ethers, upgrades } = require('hardhat');

async function main() {
    const BlackList = await hre.ethers.getContractFactory("BlackList");
    const blacklist = await BlackList.deploy();
    await blacklist.deployed();
    console.log("BlackList deployed to:", blacklist.address);
   
    const ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    const erc721Token = await upgrades.deployProxy(ERC721Token, [500, blacklist.address], {
      initializer: "initialize",
    });
  //   await erc721Token.deployed();
  //   console.log("ERC721Token   deployed to:", erc721Token.address);
  
    const ERC721TokenV2 = await hre.ethers.getContractFactory("ERC721TokenV2");
    const erc721TokenV2 = await upgrades.upgradeProxy(erc721Token, ERC721TokenV2);
    console.log("ERC721TokenV2  deployed to:", erc721TokenV2.address);
}
  
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  
  