const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller,
  buyer,
  add1,
  add2,
  add3,
  add4,
  add5,
  add6,
  myToken,
  erc721Token,
  marketPlace;

describe("MarketPlace Deployed", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
    [
      seller,
      buyer,
      add1,
      add2,
      add3,
      add4,
      add5,
      add6,
      myToken,
      erc721Token,
      marketplace,
      _,
    ] = accounts;

    //ERC20 TOKEN DEPLOYED
    let ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = await ERC20Token.deploy(ethers.utils.parseEther("10000"));

    //BLACKLIST DEPLOYED
    let BlackList = await hre.ethers.getContractFactory("BlackList");
    blacklist = await BlackList.deploy();

    // ERC721 DEPLOYED
    let ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await upgrades.deployProxy(
      ERC721Token,
      [500, blacklist.address],
      {
        intializer: "initialize",
      }
    );
    await erc721Token.deployed();

    // MARKETPLACE DEPLOYED
    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await upgrades.deployProxy(MarketPlace, [blacklist.address], {
      intializer: "initialize",
    });
    await marketPlace.deployed();

    console.log("ERC20 Address", myToken.address);
    console.log("ERC721 Address", erc721Token.address);
    console.log("BlackList Address", blacklist.address);
    console.log("MarketPlace Address", marketPlace.address);
  });

  describe("LazyAuction Function success cases", () => {
    it("LazyAuction Function mint", async () => {
        let blockNumber = await ethers.provider.getBlockNumber();
        let block = await ethers.provider.getBlock(blockNumber);
      let NFTPrice = 400;
      let Nonce = 1;
      let Royality = 250;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "Testing", myToken.address, NFTPrice, Nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.sign(messageHash, seller.address);
      // console.log("SellerSignature",SellerSign);

      let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
      // console.log("SellerSigner",SellerSigner);

      let message1 = ethers.utils.solidityPack(
        ["address","uint256","uint256","uint256"],
        [buyer.address,600,block.timestamp + 50,Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.sign(messageHash1,buyer.address);
      // console.log("BuyerSignature", BuyerSign);

      let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);
      // console.log("BuyerSigner", BuyerSigner);

      
      await myToken.transfer(buyer.address, 10000);
      
      await erc721Token
      .connect(seller)
      .setApprovalForAll(marketPlace.address, true);
      
      await myToken.connect(buyer).approve(marketPlace.address, 12000);
      console.log("OLDSellerBal",await myToken.balanceOf(seller.address) );
      console.log("OLDbuyerBal", await myToken.balanceOf(buyer.address));
      console.log("MarketPlace", await myToken.balanceOf(marketPlace.address));
      
let sellerStruct = [
      Nonce,
      seller.address,
      erc721Token.address,
      myToken.address,
      0,
      Royality,
      NFTPrice,
      SellerSign,
      "Testing",
      block.timestamp,
      block.timestamp + 100,
    ];
    let buyerStruct =[
          buyer.address,
          600,
          BuyerSign,
          block.timestamp + 50,
          Nonce
        ]

      let Lazyauction = await marketPlace.connect(buyer).lazyAuction(sellerStruct, buyerStruct);

      let calculatedRoyality = (600 * 250) / 10000;
      console.log("CalculatedRoyality", calculatedRoyality);
      let newPlatFormBal = (600 * 250) / 10000;
      console.log("New PlatFormBal", newPlatFormBal);

      console.log("NewSellerBal",await myToken.balanceOf(seller.address) );
      console.log("NewbuyerBal", await myToken.balanceOf(buyer.address));
      console.log("MarketPlace", await myToken.balanceOf(marketPlace.address));




      expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
    });

    it("LazyAuction Function", async () => {
        let blockNumber = await ethers.provider.getBlockNumber();
        let block = await ethers.provider.getBlock(blockNumber);
      let NFTPrice = 400;
      let Nonce = 2;
      let Royality = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "Testing", myToken.address, NFTPrice, Nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.sign(messageHash, buyer.address);
      // console.log("SellerSignature",SellerSign);

      let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
      // console.log("SellerSigner",SellerSigner);
      // console.log("Seller",buyer.address);

      console.log("OLDSellerBal",await myToken.balanceOf(seller.address) );
      console.log("OLDbuyerBal", await myToken.balanceOf(buyer.address));
      console.log("MarketPlace", await myToken.balanceOf(marketPlace.address));

      let message1 = ethers.utils.solidityPack(
        ["address","uint256","uint256","uint256"],
        [seller.address,600,block.timestamp + 50,Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.sign(messageHash1,seller.address);
      let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);

      // console.log("BuyerSigner", BuyerSigner);
      // console.log("buyer", seller.address);

      await erc721Token
        .connect(buyer)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(seller).approve(marketPlace.address, 12000);
      let Owner = await erc721Token.ownerOf(1)
      // console.log("Owner", Owner);

      let sellerStruct = [
              Nonce,
              buyer.address,
              erc721Token.address,
              myToken.address,
              1,
              Royality,
              NFTPrice,
              SellerSign,
              "Testing",
              block.timestamp,
              block.timestamp + 100,
            ];
            let buyerStruct =[
                    seller.address,
                    600,
                    BuyerSign,
                    block.timestamp + 50,
                    Nonce
                  ];
      let Lazyauction = await marketPlace.connect(seller).lazyAuction(sellerStruct,buyerStruct);

    
      let calculatedRoyality = (600 * 250) / 10000;
      console.log("CalculatedRoyality", calculatedRoyality);
      let newPlatFormBal = (600 * 250) / 10000;
      console.log("New PlatFormBal", newPlatFormBal);
        // console.log("iasojopajsojos", await erc721Token.ownerOf(1));
        expect(await erc721Token.ownerOf(1)).to.be.equal(seller.address)

        console.log("NewSellerBal",await myToken.balanceOf(seller.address) );
        console.log("NewbuyerBal", await myToken.balanceOf(buyer.address));
      console.log("MarketPlace", await myToken.balanceOf(marketPlace.address));

    });

  });
});
