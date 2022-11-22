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
  hawks,
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
      hawks,
      erc721Token,
      marketplace,
      _,
    ] = accounts;

    //ERC20 TOKEN DEPLOYED
    let Hawks = await hre.ethers.getContractFactory("Hawks");
     hawks = await Hawks.deploy();

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

    console.log("ERC20 Address", hawks.address);
    console.log("ERC721 Address", erc721Token.address);
    console.log("BlackList Address", blacklist.address);
    console.log("MarketPlace Address", marketPlace.address);
  });

  describe("LazyAuction Function success cases", () => {
    it("LazyAuction Function mint", async () => {
        let blockNumber = await ethers.provider.getBlockNumber();
        let block = await ethers.provider.getBlock(blockNumber);
      let NFTPrice = ethers.utils.parseEther("1");
      let Nonce = 1;
      let Royality = 250;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "Testing", hawks.address, NFTPrice, Nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.sign(messageHash, seller.address);
      // console.log("SellerSignature",SellerSign);

      let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
      // console.log("SellerSigner",SellerSigner);

      let message1 = ethers.utils.solidityPack(
        ["address","uint256","uint256","uint256"],
        [buyer.address,NFTPrice,block.timestamp + 50,Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.sign(messageHash1,buyer.address);
      // console.log("BuyerSignature", BuyerSign);

      let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);
      // console.log("BuyerSigner", BuyerSigner);

      await marketPlace.connect(seller).setMerkleRoot("0x77e700f03437c8e81143fabca89ab927d28d5207bf6ed00aa9b4d8ed5cdd6f7c");
      await hawks.transfer(buyer.address, ethers.utils.parseEther("2"));
      console.log("uguugggghhuhu",await hawks.balanceOf(buyer.address));
      
      await erc721Token
      .connect(seller)
      .setApprovalForAll(marketPlace.address, true);
      
      await hawks.connect(buyer).approve(marketPlace.address, NFTPrice);
//       console.log("OLDSellerBal",await hawks.balanceOf(seller.address) );
//       console.log("OLDbuyerBal", await hawks.balanceOf(buyer.address));
//       console.log("MarketPlace", await hawks.balanceOf(marketPlace.address));
      
let sellerStruct = [
      Nonce,
      seller.address,
      erc721Token.address,
      hawks.address,
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
          NFTPrice,
          BuyerSign,
          block.timestamp + 50,
          Nonce
        ]

      let Lazyauction = await marketPlace.connect(buyer).lazyAuction(sellerStruct, buyerStruct,[
        "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
        "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
        "0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b"
      ]);

//       let calculatedRoyality = (600 * 250) / 10000;
//       console.log("CalculatedRoyality", calculatedRoyality);
//       let newPlatFormBal = (600 * 250) / 10000;
//       console.log("New PlatFormBal", newPlatFormBal);

//       console.log("NewSellerBal",await hawks.balanceOf(seller.address) );
//       console.log("NewbuyerBal", await hawks.balanceOf(buyer.address));
//       console.log("MarketPlace", await hawks.balanceOf(marketPlace.address));




//       expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
    });

    // it("LazyAuction Function", async () => {
    //     let blockNumber = await ethers.provider.getBlockNumber();
    //     let block = await ethers.provider.getBlock(blockNumber);
    //   let NFTPrice = 400;
    //   let Nonce = 2;
    //   let Royality = 250;
    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     [erc721Token.address, 1, "Testing", hawks.address, NFTPrice, Nonce]
    //   );
    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.sign(messageHash, buyer.address);
    //   // console.log("SellerSignature",SellerSign);

    //   let SellerSigner = await marketPlace.getSigner(messageHash, SellerSign);
    //   // console.log("SellerSigner",SellerSigner);
    //   // console.log("Seller",buyer.address);

    //   console.log("OLDSellerBal",await hawks.balanceOf(seller.address) );
    //   console.log("OLDbuyerBal", await hawks.balanceOf(buyer.address));
    //   console.log("MarketPlace", await hawks.balanceOf(marketPlace.address));

    //   let message1 = ethers.utils.solidityPack(
    //     ["address","uint256","uint256","uint256"],
    //     [seller.address,600,block.timestamp + 50,Nonce]
    //   );
    //   let messageHash1 = ethers.utils.keccak256(message1);
    //   let BuyerSign = await web3.eth.sign(messageHash1,seller.address);
    //   let BuyerSigner = await marketPlace.getSigner(messageHash1,BuyerSign);

    //   // console.log("BuyerSigner", BuyerSigner);
    //   // console.log("buyer", seller.address);

    //   await erc721Token
    //     .connect(buyer)
    //     .setApprovalForAll(marketPlace.address, true);

    //   await hawks.connect(seller).approve(marketPlace.address, 12000);
    //   let Owner = await erc721Token.ownerOf(1)
    //   // console.log("Owner", Owner);

    //   let sellerStruct = [
    //           Nonce,
    //           buyer.address,
    //           erc721Token.address,
    //           hawks.address,
    //           1,
    //           Royality,
    //           NFTPrice,
    //           SellerSign,
    //           "Testing",
    //           block.timestamp,
    //           block.timestamp + 100,
    //         ];
    //         let buyerStruct =[
    //                 seller.address,
    //                 600,
    //                 BuyerSign,
    //                 block.timestamp + 50,
    //                 Nonce
    //               ];
    //   let Lazyauction = await marketPlace.connect(seller).lazyAuction(sellerStruct,buyerStruct,);

    
    //   let calculatedRoyality = (600 * 250) / 10000;
    //   console.log("CalculatedRoyality", calculatedRoyality);
    //   let newPlatFormBal = (600 * 250) / 10000;
    //   console.log("New PlatFormBal", newPlatFormBal);
    //     // console.log("iasojopajsojos", await erc721Token.ownerOf(1));
    //     expect(await erc721Token.ownerOf(1)).to.be.equal(seller.address)

    //     console.log("NewSellerBal",await hawks.balanceOf(seller.address) );
    //     console.log("NewbuyerBal", await hawks.balanceOf(buyer.address));
    //   console.log("MarketPlace", await hawks.balanceOf(marketPlace.address));

    // });

  });
});
