const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller,
  buyer,
  add1,
  add2,
  add4,
  myToken,
  decimalPrecision = 100,
  royality = 200,
  bidTime = 200;
platFormFeePercent = 250;

describe("marketPlace", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
    [
      seller,
      buyer,
      add1,
      add2,
      tokenId,
      add3,
      add4,
      userA,
      userB,
      userC,
      userD,
      userE,
      _,
    ] = accounts;

    const MarketPlace = await ethers.getContractFactory("MarketPlace");
    const marketPlace = await MarketPlace.deploy();
    await marketPlace.deployed();
    console.log("MarketPlace deployed to:", marketPlace.address);
  

  
    const ERC721Token = await ethers.getContractFactory("ERC721Token");
    const eRC721Token = await ERC721Token.deploy("sanjay", "skc");
    await eRC721Token.deployed();
    console.log("ERC721Token deployed to:", eRC721Token.address);
  
  });

  describe("lazy buy function success cases", () => {
    it("Lazybuy Function", async () => {
      // Get current block.timestamp
      let nonce = 0
      let message = ethers.utils.solidityPack(
        ["uint256", "uint256", "string", "uint256"],
        [nonce, 200, "sanjay", 37]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);
   console.log(sign, seller.address);
      // await weth.connect(buyer).deposit({ value: "1000000000000" });

      // await myNFT.connect(seller).setApprovalForAll(marketPlace.address, true);

      // await weth.connect(buyer).approve(marketPlace.address, 2000);

      // LAZY = await marketPlace
      //   .connect(buyer)
      //   .lazyBuy([
      //     nonce,
      //     seller.address,
      //     myNFT.address,
      //     weth.address,
      //     0,
      //     royality,
      //     200,
      //     sign,
      //     "abhi",
      //     block.timestamp,
      //     block.timestamp + 100,
      //   ]);

      // expect(await myNFT.ownerOf(1)).to.be.equal(buyer.address);
      // expect(await myNFT.balanceOf(buyer.address)).to.be.equal(1);
    });
  });
});
