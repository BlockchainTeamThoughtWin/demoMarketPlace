// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you’ll find the Hardhat
// Runtime Environment’s members available in the global scope.
const { upgrades } = require('hardhat');
const hre = require('hardhat');

async function main() {
 
  
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace")
  const marketPlace = await upgrades.upgradeProxy("0xb0243add64D8ACFCd30E7E99E9Ff0ba784eB612f", MarketPlace)
  
  await marketPlace.deployed();
  console.log("Updated")

console.log("MarketPlace deployed to:", marketPlace.address);

  const address = await hre.upgrades.erc1967.getImplementationAddress(
    marketPlace.address
  );
  console.log("Address:", marketPlace.address);
  console.log("Address:", address);

  await hre.run("verify:verify", {
    address: address,
    contract: "contracts/MarketPlace.sol:MarketPlace",
    constructorArguments: []
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });







