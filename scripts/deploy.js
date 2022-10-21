const hre = require("hardhat");


async function main() {
  // signers = await ethers.getSigners();

  const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
  const myToken = await ERC20Token.deploy("1000");
  await myToken.deployed();
  console.log("ERC20Token deployed to:", myToken.address);


    // BlackList
  const BlackList = await hre.ethers.getContractFactory("BlackList");
  blacklist = await BlackList.deploy();
  await blacklist.deployed();
  console.log("BlackList deployed to:", blacklist.address);
 
    // NFT721 Deployed

  // ERC721
  const ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
  erc721Token = await upgrades.deployProxy(ERC721Token, [500], {
    initializer: "initialize",
  });
  await erc721Token.deployed();
  console.log("ERC721Token   deployed to:", erc721Token.address);

  // MarketPlace
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  marketPlace = await upgrades.deployProxy(MarketPlace, [ blacklist.address], {
    initializer: "initialize",
  });
  await marketPlace.deployed();
  console.log("MarketPlace deployed to:", marketPlace.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
