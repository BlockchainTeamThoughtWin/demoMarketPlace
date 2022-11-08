const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");

let owner1, seller, buyer;

describe("NFTCollection", async () => {
  before(async () => {
    let accounts = await ethers.getSigners();
    [owner1, seller, buyer] = accounts;

    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0x635D5AD950B46d630cEAc70A60102F0032F4010F"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0xb0243add64D8ACFCd30E7E99E9Ff0ba784eB612f"
    );

    ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = ERC20Token.attach("0x602d54400e53C2BBC28845CF657d77E7Ffb37286");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    BlackList = await BlackList.attach(
      "0x90e5eFBE974B39E949f31952B649a4D3808AFa78"
    );
  });


  
  describe("Testing MarketPlace Functions",() => {
    it("Should Mint Nft and put it on Auction", async () => {
      let BlockNumber = await ethers.provider.getBlockNumber();
      let Block = await ethers.provider.getBlock(BlockNumber);
      let SellerPrivate = "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b"
      let BuyerPrivate = "020fe9e134d82232b7d370014c63d73a1015a17e7f6b3ab6e48d0d1f9ac9ace2"

      let NFTPrice = 500;
      let Nonce = 25;
      let Royality = 250;
      let PlatFee = 250;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        ["0x635D5AD950B46d630cEAc70A60102F0032F4010F", 0, "Demo", "0x602d54400e53C2BBC28845CF657d77E7Ffb37286", NFTPrice, Nonce]
      );

      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);
      
      let message1 = ethers.utils.solidityPack(
        ["address", "uint256", "uint256", "uint256"],
        [buyer.address, NFTPrice+200, Block.timestamp + 111, Nonce]
      );
      let messageHash1 = ethers.utils.keccak256(message1);
      let BuyerSign = await web3.eth.accounts.sign(messageHash1,BuyerPrivate);
      
      // await myToken.transfer(buyer.address,1000000);
      await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
      await myToken.connect(buyer).approve(marketPlace.address,20000);
      console.log("OLDSellerBal", await myToken.balanceOf(seller.address));
      console.log("OLDBuyerBal", await myToken.balanceOf(buyer.address));
      console.log("OLDMarketBal", await myToken.balanceOf(marketPlace.address));
      
     
      let SellerStruct = [Nonce,seller.address,erc721Token.address,myToken.address,0,Royality,NFTPrice,SellerSign.signature,"Demo",Block.timestamp,Block.timestamp + 100]
      let BuyerStruct = [buyer.address,NFTPrice+200,BuyerSign.signature,Block.timestamp+111,Nonce];
      let LazyAuction = await marketPlace.connect(buyer).lazyAuction(SellerStruct,BuyerStruct);
        let CalculatedRoyality = (NFTPrice*PlatFee)/10000;
        console.log("Royality",CalculatedRoyality);

        let CalPlatform = (NFTPrice*PlatFee)/10000;
        console.log("PlatformFeee",CalPlatform); 

        console.log("newSellerBal", await myToken.balanceOf(seller.address));
        console.log("newBuyerBal", await myToken.balanceOf(buyer.address));
        console.log("newMarketBal", await myToken.balanceOf(marketPlace.address));

        


    })

    // it("Should put minted NFT on Auction",async  () => {
    //   let BlockNumber = await ethers.provider.getBlockNumber();
    //   let Block = await ethers.provider.getBlock(BlockNumber);
    //   let SellerPrivate = "020fe9e134d82232b7d370014c63d73a1015a17e7f6b3ab6e48d0d1f9ac9ace2"
    //   let BuyerPrivate = "fa27394e98fadce31d62e0ef49adad668abd76abbd953d46f1b2c7f1d23d6e62"

    //   let NFTPrice = 600;
    //   let Nonce = 22;
    //   let Royality = 250;
    //   let PlatFee = 250;
    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     ["0x635D5AD950B46d630cEAc70A60102F0032F4010F", 4, "Demo", "0x602d54400e53C2BBC28845CF657d77E7Ffb37286", NFTPrice, Nonce]
    //   );

    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);
      
    //   let message1 = ethers.utils.solidityPack(
    //     ["address", "uint256", "uint256", "uint256"],
    //     [owner1.address, NFTPrice+200, Block.timestamp + 111, Nonce]
    //   );
    //   let messageHash1 = ethers.utils.keccak256(message1);
    //   let BuyerSign = await web3.eth.accounts.sign(messageHash1,BuyerPrivate);
    //   // await myToken.transfer(owner1.address,1000000);
    //   // await erc721Token.connect(buyer).setApprovalForAll(marketPlace.address, true);
    //   // await myToken.connect(owner1).approve(marketPlace.address,20000);

    //   let SellerStruct = [Nonce,buyer.address,erc721Token.address,myToken.address,4,Royality,NFTPrice,SellerSign.signature,"Demo",Block.timestamp,Block.timestamp + 100]
    //   let BuyerStruct = [owner1.address,NFTPrice+200,BuyerSign.signature,Block.timestamp+111,Nonce];
    //   // let LazyAuction = await marketPlace.connect(buyer).lazyAuction(SellerStruct,BuyerStruct);
    //   console.log(await myToken.balanceOf(owner1.address));
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

    // it("Should LazyBuy Minted NFT", async () => {
    //   let BlockNumber = await ethers.provider.getBlockNumber();
    //   let Block = await ethers.provider.getBlock(BlockNumber);
    //   let SellerPrivate = "020fe9e134d82232b7d370014c63d73a1015a17e7f6b3ab6e48d0d1f9ac9ace2"

    //   let NFTPrice = 900;
    //   let Nonce = 24;
    //   let Royality = 250;
    //   let PlatFee = 250;

    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     ["0x635D5AD950B46d630cEAc70A60102F0032F4010F", 5, "DemoTest", "0x602d54400e53C2BBC28845CF657d77E7Ffb37286", NFTPrice, Nonce]
    //   );

    //   let messageHash = ethers.utils.keccak256(message);
    //   let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);


    //   // await myToken.transfer(buyer.address,1000000);
    //   await erc721Token.connect(buyer).setApprovalForAll(marketPlace.address, true);
    //   await myToken.connect(owner1).approve(marketPlace.address,20000);

    //   let Lazybuy = await marketPlace
    //               .connect(owner1)
    //               .LazyBuy([
    //                 Nonce,
    //                 buyer.address,
    //                 erc721Token.address,
    //                 myToken.address,
    //                 5,
    //                 Royality,
    //                 NFTPrice,
    //                 SellerSign.signature,
    //                 "DemoTest",
    //                 Block.timestamp,
    //                 Block.timestamp + 100,
    //               ]);

    //             });
              
  })

});
