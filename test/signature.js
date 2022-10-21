const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller, myToken, buyer, add1, add2, add3, erc721Token, marketPlace;

describe("MarketPlace", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
    [seller, buyer, myToken, erc721Token, add1, add2, add3, marketPlace, _] =
      accounts;
    //    ERC20 Token
    let ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = await ERC20Token.deploy("10000000");

    //   Blacklist Deployed
    let BlackList = await hre.ethers.getContractFactory("BlackList");
    blacklist = await BlackList.deploy();

    // ERC721 Deployed
    let ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await upgrades.deployProxy(
      ERC721Token,
      [500, blacklist.address],
      {
        initializer: "initialize",
      }
    );
    await erc721Token.deployed();

    //   MarketPlace Deployed
    let MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await upgrades.deployProxy(MarketPlace, [blacklist.address], {
      initializer: "initialize",
    });
    await marketPlace.deployed();
  });
  describe("lazy buy functwion success cases", () => {
    it("Lazybuy Functiown", async () => {
      // let blockNumber = await ethers.provider.getBlockNumber();
      // let block = await ethers.provider.getBlock(blockNumber);

  //     let message = ethers.utils.solidityPack(
  //       ["address", "uint256", "string", "address", "uint256", "uint256"],
  //       [erc721Token.address, 0, "test", myToken.address, 200, 1]
  //     );
  //     let messageHash = ethers.utils.keccak256(message);
  //     let sign = await web3.eth.sign(messageHash, seller.address);

  //     await myToken.transfer(buyer.address, 10000);

  //     await erc721Token
  //       .connect(seller)
  //       .setApprovalForAll(marketPlace.address, true);

  //     await myToken.connect(buyer).approve(marketPlace.address, 2000);

  //     Lazybuy = await marketPlace
  //       .connect(buyer)
  //       .LazyBuy([
  //         1,
  //         seller.address,
  //         erc721Token.address,
  //         myToken.address,
  //         0,
  //         100,
  //         200,
  //         sign,
  //         "test",
  //         block.timestamp,
  //         block.timestamp + 100,
  //       ]);

    });
  });
  describe("lazy buy function success cases", () => {
    it("Lazybuy Function", async () => {
      // Get current block.timestamp
  //     let nonce =0;
  //     let blockNumber = await ethers.provider.getBlockNumber();
  //     let block = await ethers.provider.getBlock(blockNumber);

  //     let message = ethers.utils.solidityPack(
  //       ["address", "uint256", "string", "address", "uint256","uint256"],
  //       [myNFT.address, 0, "abhi", weth.address, 200,nonce]
  //     );
  //     let messageHash = ethers.utils.keccak256(message);
  //     let sign = await web3.eth.sign(messageHash, seller.address);
  //  console.log(seller.address);
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







