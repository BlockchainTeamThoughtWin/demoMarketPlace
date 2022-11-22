const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");

let owner1, seller, buyer;

describe("NFTCollection", async () => {
  before(async () => {
    let accounts = await ethers.getSigners();
    [owner1, seller, buyer] = accounts;

    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0x10E457129b4F5F35EdaC901AC669333a887C1513"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0x473F94773f52E8F4967EE7F91650a90cc85f03b7"
    );

    Hawks = await hre.ethers.getContractFactory("Hawks");
    hawks = Hawks.attach("0x12A98122E956Bbf3535523Ac9A2C178E3E2af325");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    BlackList = await BlackList.attach(
      "0x85C6C022F8007A8392E83C0a00eC41B66e8e4B8d"
    );
  });


  
  describe("Testing MarketPlace Functions",() => {
    it("Should Mint Nft and put it on Auction", async () => {
      let BlockNumber = await ethers.provider.getBlockNumber();
      let Block = await ethers.provider.getBlock(BlockNumber);
      let SellerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"
      let BuyerPrivate = "020fe9e134d82232b7d370014c63d73a1015a17e7f6b3ab6e48d0d1f9ac9ace2"

      let NFTPrice = 6000;
      let Nonce = 12;
      let Royality = 400;
      // let PlatFee = 350;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "Demo", hawks.address, NFTPrice, Nonce]
      );

      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);
      
      let message1 = ethers.utils.solidityPack(
        ["address", "uint256", "uint256", "uint256"],
        [buyer.address, NFTPrice+200, Block.timestamp + 111, Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.accounts.sign(messageHash1,BuyerPrivate);
     
     console.log("nkans", seller.address, await hawks.balanceOf(seller.address));
     console.log("nasasasakans",  buyer.address, await hawks.balanceOf(buyer.address)); 
    
      // console.log("asnksn", buyer.address);
      // await hawks.connect(seller).transfer(buyer.address,NFTPrice);
      await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
      await hawks.connect(buyer).approve(marketPlace.address,NFTPrice);
      // console.log("OLDSellerBal", await myToken.balanceOf(seller.address));
      // console.log("OLDBuyerBal", await myToken.balanceOf(buyer.address));
      // console.log("OLDMarketBal", await myToken.balanceOf(marketPlace.address));
      
     
      let SellerStruct = [Nonce,seller.address,erc721Token.address,hawks.address,1,Royality,NFTPrice,SellerSign.signature,"Demo",Block.timestamp,Block.timestamp + 100]
      let BuyerStruct = [buyer.address,NFTPrice+200,BuyerSign.signature,Block.timestamp+111,Nonce];
      let LazyAuction = await marketPlace.connect(buyer).lazyAuction(SellerStruct,BuyerStruct,[
             "0xd8dc0f69e910411fe490fa6d37d0c1624dfccf0506c98ff5140448cb5faedc54",
            "0x536382c680b10be7294edd08db0161a6f438e9340af2a04916d8ad39952fac67"
          ]);

        // let CalculatedRoyality = (NFTPrice*PlatFee)/10000;
        // console.log("Royality",CalculatedRoyality);

        // let CalPlatform = (NFTPrice*PlatFee)/10000;
        // console.log("PlatformFeee",CalPlatform); 

        // console.log("newSellerBal", await myToken.balanceOf(seller.address));
        // console.log("newBuyerBal", await myToken.balanceOf(buyer.address));
        // console.log("newMarketBal", await myToken.balanceOf(marketPlace.address));

        


    })

    // it("Should put minted NFT on Auction",async  () => {
    //   let BlockNumber = await ethers.provider.getBlockNumber();
    //   let Block = await ethers.provider.getBlock(BlockNumber);
    //   let SellerPrivate = "97c7569b82466aecbd368c57ef59a028edc12bb4747694aa76acc88eccfc8637"
    //   let BuyerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"

    //   let NFTPrice = 6000;
    //   let Nonce = 3;
    //   let Royality = 450;
    //   let PlatFee = 250;
    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     ["0xE711CFBB11d65A4a8AD29830636E6106a5d2693c", 1, "DemoTest", "0x577C0fE754d162b41aa690f99f070c04D419c336", NFTPrice, Nonce]
    //   );

    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);
    //   let Signer = await marketPlace.getSigner(messageHash,SellerSign.signature)
    //   console.log(Signer);
    //   console.log(seller.address);

      
    //   let message1 = ethers.utils.solidityPack(
    //     ["address", "uint256", "uint256", "uint256"],
    //     [buyer.address, NFTPrice+200, Block.timestamp + 111, Nonce]
    //   );
    //   let messageHash1 = ethers.utils.keccak256(message1);
    //   let BuyerSign = await web3.eth.accounts.sign(messageHash1,BuyerPrivate);
    //   // await myToken.transfer(owner1.address,1000000);
    //  await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
    //   // await myToken.connect(owner1).approve(marketPlace.address,20000);

    //   let SellerStruct = [Nonce,seller.address,erc721Token.address,hawks.address,1,Royality,NFTPrice,SellerSign.signature,"DemoTest",Block.timestamp,Block.timestamp + 100]
    //   let BuyerStruct = [buyer.address,NFTPrice+200,BuyerSign.signature,Block.timestamp+111,Nonce];
    //   let LazyAuction = await marketPlace.connect(buyer).lazyAuction(SellerStruct,BuyerStruct,[
    //     "0x7e512bec4a9170819e40e998faf3f97ada2c9f80613fecbcedf1750dc4d3f248",
    //     "0x536382c680b10be7294edd08db0161a6f438e9340af2a04916d8ad39952fac67"
    //   ]);
    
    //   // console.log(await myToken.balanceOf(owner1.address));
    // })

    // it("Should Mint Nft and LazyBuy it", async() => {
    //   let BlockNumber = await ethers.provider.getBlockNumber();
    //   let Block = await ethers.provider.getBlock(BlockNumber);
    //   let SellerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"

    //   let NFTPrice = 800;
    //   let Nonce = 23;
    //   let Royality = 250;
    //   let PlatFee = 250;

    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     ["0x635D5AD950B46d630cEAc70A60102F0032F4010F", 0, "DemoTest", "0x602d54400e53C2BBC28845CF657d77E7Ffb37286", NFTPrice, Nonce]
    //   );

    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);


    //   await myToken.transfer(buyer.address,1000000);
    //   await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
    //   await myToken.connect(buyer).approve(marketPlace.address,20000);

    //   let Lazybuy = await marketPlace
    //               .connect(buyer)
    //               .LazyBuy([
    //                 Nonce,
    //                 seller.address,
    //                 erc721Token.address,
    //                 myToken.address,
    //                 0,
    //                 Royality,
    //                 NFTPrice,
    //                 SellerSign.signature,
    //                 "DemoTest",
    //                 Block.timestamp,
    //                 Block.timestamp + 100,
    //               ]);

      
    // })

//     it("Should LazyBuy Minted NFT", async () => {
//       let BlockNumber = await ethers.provider.getBlockNumber();
//       let Block = await ethers.provider.getBlock(BlockNumber);
//       let SellerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"

//       let NFTPrice = 800;
//       let Nonce = 2;
//       let Royality = 250;
//       let PlatFee = 250;

//       let message = ethers.utils.solidityPack(
//         ["address", "uint256", "string", "address", "uint256", "uint256"],
//         [erc721Token.address, 1, "DemoTest", hawks.address, NFTPrice, Nonce]
//       );

//       let messageHash = ethers.utils.keccak256(message);
//       let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);
//       let Signer = await marketPlace.getSigner(messageHash,SellerSign.signature);
//       console.log(SellerSign.signature);
//       // await marketPlace.connect(seller).setMerkleRoot("0x5ddf4465d4cca7e2b93887503bd051cdb86934b03e80fb3b05b776fb867c641e");


//        await hawks.transfer(buyer.address,10000);
//       await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
//       console.log(seller.address);
//        await hawks.connect(buyer).approve(marketPlace.address,10000);
//        console.log( await hawks.balanceOf(buyer.address));

// let LAAZY =  await marketPlace
//                   .connect(buyer)
//                   .LazyBuy([
//                     Nonce,
//                     seller.address,
//                     erc721Token.address,
//                     hawks.address,
//                     1,
//                     Royality,
//                     NFTPrice,
//                     SellerSign.signature,
//                     "DemoTest",
//                     Block.timestamp,
//                     Block.timestamp + 100,
//                   ],[
//                     "0x3dd280c75e609767e354cc460a8f10d4c7d4765007d0c90cb98d921045c2c1f4",
//                     // "0x536382c680b10be7294edd08db0161a6f438e9340af2a04916d8ad39952fac67"
                    
//                   ]
//                   );

//                 });
              
  })

});
