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
    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await upgrades.deployProxy(MarketPlace, [blacklist.address], {
      initializer: "initialize",
    });
    await marketPlace.deployed();
  });
  describe("lazy buy function success cases", () => {
    it("Lazybuy Function", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", myToken.address, 200, 1]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);

      await myToken.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(buyer).approve(marketPlace.address, 2000);

      Lazybuy = await marketPlace
        .connect(buyer)
        .LazyBuy([
          1,
          seller.address,
          erc721Token.address,
          myToken.address,
          1,
          100,
          200,
          sign,
          "test",
          block.timestamp,
          block.timestamp + 100,
        ]);

    });
  });
});