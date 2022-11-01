const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller, myToken, buyer, add1, add2, add3,add4, erc721Token, marketPlace;

describe("MarketPlace", () => {
  before(async () => {
    accounts = await hre.ethers.getSigners();
    [seller, buyer, myToken, erc721Token, add1, add2, add3,add4, marketPlace, _] =
      accounts;
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
      let nftPrice = 200;
      let nonce = 1;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", myToken.address, nftPrice, nonce]
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
          nonce,
          seller.address,
          erc721Token.address,
          myToken.address,
          1,
          100,
          nftPrice,
          sign,
          "test",
          block.timestamp,
          block.timestamp + 100,
        ]);

      expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
      expect(await erc721Token.balanceOf(buyer.address)).to.be.equal(1);

      console.log(seller.address);
      console.log(buyer.address);

      console.log(add1.address);

      console.log(add2.address);
      console.log(add3.address);


    });

    it("Buy Minted Nft ", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 2;
      let nftPrice = 300;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "testing", myToken.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, buyer.address);

      await myToken.transfer(add1.address, 10000);

      await erc721Token
        .connect(buyer)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(add1).approve(marketPlace.address, 2000);

      Lazybuy = await marketPlace
        .connect(add1)
        .LazyBuy([
          nonce,
          buyer.address,
          erc721Token.address,
          myToken.address,
          1,
          100,
          nftPrice,
          sign,
          "testing",
          block.timestamp,
          block.timestamp + 100,
        ]);

      expect(await erc721Token.ownerOf(1)).to.be.equal(add1.address);

      expect(await erc721Token.balanceOf(add1.address)).to.be.equal(1);
    });

    it("Check Royality", async () => {
      let nftPrice = 300;
      tokenId = 1;
      let Roy = await erc721Token.royaltyInfo(tokenId, nftPrice);

      expect(await Roy).to.deep.equal([
        seller.address,
        ethers.BigNumber.from("3"),
      ]);
    });

    it("Should check the calculate Royality and Platform fee", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);

      let nonce = 9;
      let nftPrice = ethers.utils.parseEther("1");
      let royality = 100;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "testing", myToken.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = web3.eth.sign(messageHash, add1.address);

      let oldSellerBal = await myToken.balanceOf(add1.address);
      let oldBuyerBal = await myToken.balanceOf(add3.address);
      // console.log("oldSellBal", oldSellerBal);
      // console.log("oldBuyBal", oldBuyerBal);

      await myToken.transfer(add3.address, nftPrice);

      await erc721Token
        .connect(add1)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(add3).approve(marketPlace.address, nftPrice);

      let OldPlatFormBal = await erc721Token.balanceOf(marketPlace.address);
      // console.log("OLd PlatFormBal", OldPlatFormBal);

      Lazybuy = await marketPlace
        .connect(add3)
        .LazyBuy([
          nonce,
          add1.address,
          erc721Token.address,
          myToken.address,
          1,
          royality,
          nftPrice,
          sign,
          "testing",
          block.timestamp,
          block.timestamp + 100,
        ]);

      expect(await erc721Token.ownerOf(1)).to.be.equal(add3.address);

      expect(await erc721Token.balanceOf(add3.address)).to.be.equal(1);

      let calculatedRoyality = (nftPrice * royality) / 10000;
      // let calculatedRoyality =  await (erc721Token.royaltyInfo(tokenId,nftPrice))
      // console.log("CalculatedRoyality", calculatedRoyality);

      let newPlatFormBal = (nftPrice * plat) / 10000;
      // console.log("New PlatFormBal", newPlatFormBal);

      let remainingAmount = nftPrice - calculatedRoyality - newPlatFormBal;
      // console.log("Remaining Amount", remainingAmount);

      let newSellerBal = await myToken.balanceOf(add1.address);
      let newBuyerBal = await myToken.balanceOf(add3.address);
      // console.log("newSellBal", newSellerBal);
      // console.log("newBuyBal", newBuyerBal);

      expect(newSellerBal).to.be.equals(
        oldSellerBal.add(ethers.BigNumber.from(remainingAmount.toString()))
      );
    });

    // it ("Should check event", async () => {

    //   let blockNumber = await ethers.provider.getBlockNumber();
    //   let block = await ethers.provider.getBlock(blockNumber);
    //   let nonce = 10;
    //   let nftPrice = ethers.utils.parseEther("1");
    //   let royality = 100;
    //   let plat = 250;
    //   let message = ethers.utils.solidityPack(
    //     ["address", "uint256", "string", "address", "uint256", "uint256"],
    //     [erc721Token.address, 1, "teting", myToken.address, nftPrice, nonce]
    //   );
    //   let messageHash = ethers.utils.keccak256(message);
    //   let sign = web3.eth.sign(messageHash, add3.address);
    //   await myToken.transfer(add4.address, nftPrice);

    //   await erc721Token
    //     .connect(add3)
    //     .setApprovalForAll(marketPlace.address, true);

    //   await myToken.connect(add4).approve(marketPlace.address, nftPrice);
    //  let  Lazybuy = await marketPlace
    //   .connect(add4)
    //   .LazyBuy([
    //     nonce,
    //     add3.address,
    //     erc721Token.address,
    //     myToken.address,
    //     1,
    //     royality,
    //     nftPrice,
    //     sign,
    //     "teting",
    //     block.timestamp,
    //     block.timestamp + 100,
    //   ]);

    // expect(await erc721Token.ownerOf(1)).to.be.equal(add4.address);

    // expect(await erc721Token.balanceOf(add4.address)).to.be.equal(1);

    // receipt = await Lazybuy.wait();
    //         for (const event of receipt.events) {
    //             // console.log("Event Name:", event.args);
    //         }
    //          expect(await receipt.events[1].args[2]).to.be.equals(add9.address);
    //         // expect(await receipt.events[1].event).to.be.equals("OnSale");
    //         // console.log("Event Name: ", await receipt.events[1].event);
    //         // console.log("Owner Address: ", await receipt.events[1].args[2]);
    // })
  });

  describe("LazyBuy Negative Cases", () => {
    it("Should check nonce", () => {
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

        expect(
          await marketPlace
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
            ])
        ).to.be.revertedWith("MarketPlace: Nonce already process");
      });
    });

    it("Should Check that colection must be approve", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 3;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", myToken.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);

      await myToken.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, false);

      await myToken.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy([
            nonce,
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
          ])
      ).to.be.revertedWith("MarketPlace: Collection must be approved.");
    });

    it("Should Check Seller Signature", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 4;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", myToken.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, buyer.address);
     
      
      


      await myToken.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, false);

      await myToken.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy([
            nonce,
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
          ])
      ).to.be.revertedWith(
        "MarketPlace: sellerAddress sign verification failed"
      );
    });

    it("Check invalid signature length", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 5;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", myToken.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);

      await myToken.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy([
            nonce,
            seller.address,
            erc721Token.address,
            myToken.address,
            1,
            100,
            200,
            "0x4b7146d6dc30cd551dd60c5d6fa6ea20428d9ee2e12fea43f33c9b1f12b034456bb3646cf6cb2f8ae667d2d7a2b8bd8e1600651d7b13708c366e6b2f4aae37c3",
            "test",
            block.timestamp,
            block.timestamp + 100,
          ])
      ).to.be.revertedWith("MarketPlace: invalid signature length.");
    });

     it ("Should check Token Allowance", async ()=> {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 6;

      let message = ethers.utils.solidityPack(
        ["address","uint256", "string","address","uint256","uint256"],
        [erc721Token.address, 1,"testing", myToken.address,300,nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash,add3.address)

      await myToken.transfer(add2.address, 10000);

      await erc721Token
        .connect(add3)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(add2).approve(marketPlace.address, 50);

    await  expect (marketPlace
        .connect(add2)
        .LazyBuy([
          nonce,
          add3.address,
          erc721Token.address,
          myToken.address,
          1,
          100,
          300,
          sign,
          "testing",
          block.timestamp,
          block.timestamp + 100,
        ])).to.be.revertedWith( "MarketPlace: Check the token allowance.")
     })

     it ("Should check Balance", async ()=> {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 6;

      let message = ethers.utils.solidityPack(
        ["address","uint256", "string","address","uint256","uint256"],
        [erc721Token.address, 1,"testing", myToken.address,1000000000000000,nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash,add3.address)

      // await myToken.transfer(add2.address, 10000);

      await erc721Token
        .connect(add3)
        .setApprovalForAll(marketPlace.address, true);

      await myToken.connect(add2).approve(marketPlace.address, 1000);

    await  expect (marketPlace
        .connect(add2)
        .LazyBuy([
          nonce,
          add3.address,
          erc721Token.address,
          myToken.address,
          1,
          100,
          1000000000000000,
          sign,
          "testing",
          block.timestamp,
          block.timestamp + 100,
        ])).to.be.revertedWith( 'MarketPlace: Insufficient Amount')
     })
  });
});
