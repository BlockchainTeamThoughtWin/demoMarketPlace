// const { expect } = require("chai");
// const { ethers, web3 } = require("hardhat");

// let owner1, seller, buyer;

// describe("NFTCollection", async () => {
//   before(async () => {
//     let accounts = await ethers.getSigners();
//     [owner1, seller, buyer] = accounts;

//     ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
//     erc721Token = await ERC721Token.attach(
//       "0x3E7DFA2d32e378CC50582f38Ef1D414b0afD4B5e"
//     );

//     MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
//     marketPlace = await MarketPlace.attach(
//       "0x3080D0d64698c379c812D28E175F138315F3d86A"
//     );

//     ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
//     myToken = ERC20Token.attach("0x7fE38b2ab3e266A1112954046B9Ca72C6E90c14E");

//     BlackList = await hre.ethers.getContractFactory("BlackList");
//     BlackList = await BlackList.attach(
//       "0x83B2D0b301be3D66a2aE651c31a0bb82E95dc932"
//     );
//   })
//   describe("Testing MarketPlace Functions",() => {
//    it("Should Mint Nft and LazyBuy it", async() => {
//       let BlockNumber = await ethers.provider.getBlockNumber();
//       let Block = await ethers.provider.getBlock(BlockNumber);
//       let SellerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"

//       let NFTPrice = 800;
//       let Nonce = 1;
//       let Royality = 250;
//       let PlatFee = 250;

//       let message = ethers.utils.solidityPack(
//         ["address", "uint256", "string", "address", "uint256", "uint256"],
//         ["0x3080D0d64698c379c812D28E175F138315F3d86A", 0, "DemoTest", "0x7fE38b2ab3e266A1112954046B9Ca72C6E90c14E", NFTPrice, Nonce]
//       );

//       let messageHash = ethers.utils.keccak256(message);
//       let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);


//     //   await myToken.transfer(buyer.address,1000000);
//     //   await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
//     //   await myToken.connect(buyer).approve(marketPlace.address,20000);

//     //   let Lazybuy = await marketPlace
//     //               .connect(buyer)
//     //               .LazyBuy([
//     //                 Nonce,
//     //                 seller.address,
//     //                 erc721Token.address,
//     //                 myToken.address,
//     //                 0,
//     //                 Royality,
//     //                 NFTPrice,
//     //                 SellerSign.signature,
//     //                 "DemoTest",
//     //                 Block.timestamp,
//     //                 Block.timestamp + 100,
//     //               ],["0x7e512bec4a9170819e40e998faf3f97ada2c9f80613fecbcedf1750dc4d3f248"]);

//                 //   expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
//                 console.log([
//                     Nonce,
//                     seller.address,
//                     erc721Token.address,
//                     myToken.address,
//                     0,
//                     Royality,
//                     NFTPrice,
//                     SellerSign.signature,
//                     "DemoTest",
//                     Block.timestamp,
//                     Block.timestamp + 100,
//                   ],["0x7e512bec4a9170819e40e998faf3f97ada2c9f80613fecbcedf1750dc4d3f248"]);

      
//     })
// })
// })

// [1,"0x98D69FbC69d164A63ce46984750d25749ce5E87e","0x3E7DFA2d32e378CC50582f38Ef1D414b0afD4B5e","0x7fE38b2ab3e266A1112954046B9Ca72C6E90c14E",0,250,800,"0x06fe6a2f96565904f7c425705bb62fd106f2f04654c5df32e63740b01f37f16e0a50f80a1a531ff6fc8c9fb0d49c0781ed9f71166447d236534173b6142d5eb11b","DemoTest",1667991697, 1667991797]

//   ["0x7e512bec4a9170819e40e998faf3f97ada2c9f80613fecbcedf1750dc4d3f248"]



const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller,
  myToken,
  buyer,
  add1,
  add2,
  add3,
  add4,
  add5,
  add6,
  erc721Token,
  marketPlace;

describe("MarketPlace", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
    [
      seller,
      buyer,
      myToken,
      erc721Token,
      add1,
      add2,
      add3,
      add4,
      add5,
      add6,
      marketPlace,
      _,
    ] = accounts;
    //    ERC20 Token
    let ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = await ERC20Token.deploy(ethers.utils.parseEther("10000"));

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
      let nftPrice = ethers.utils.parseEther("1");
      let plat = 250;
      let royality = 100;
      let nonce = 1;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "test", myToken.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);
      await marketPlace.setMerkleRoot("0x77e700f03437c8e81143fabca89ab927d28d5207bf6ed00aa9b4d8ed5cdd6f7c");

      await myToken.transfer(buyer.address, ethers.utils.parseEther("2"));

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(buyer).approve(marketPlace.address, nftPrice);
      console.log(seller.address);
      console.log(buyer.address);



      Lazybuy = await marketPlace
        .connect(buyer)
        .LazyBuy([
          nonce,
          seller.address,
          erc721Token.address,
          myToken.address,
          0,
          royality,
          nftPrice,
          sign,
          "test",
          block.timestamp,
          block.timestamp + 100,
        ], [
            "0x00314e565e0574cb412563df634608d76f5c59d9f817e85966100ec1d48005c0",
            "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
            "0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b",
          ]);

    //   expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
    //   expect(await erc721Token.balanceOf(buyer.address)).to.be.equal(1);
    });
})
})

   