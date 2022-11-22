const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-web3");

let seller,
  hawks,
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
      hawks,
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
    let Hawks = await hre.ethers.getContractFactory("Hawks");
    hawks = await Hawks.deploy();
    // await hawks.deployed();

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
        [erc721Token.address, 0, "test", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0x77e700f03437c8e81143fabca89ab927d28d5207bf6ed00aa9b4d8ed5cdd6f7c"
        );

      await hawks.transfer(buyer.address, ethers.utils.parseEther("1"));

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(buyer).approve(marketPlace.address, nftPrice);

      Lazybuy = await marketPlace
        .connect(buyer)
        .LazyBuy(
          [
            nonce,
            seller.address,
            erc721Token.address,
            hawks.address,
            0,
            royality,
            nftPrice,
            sign,
            "test",
            block.timestamp,
            block.timestamp + 100,
          ],
          [
            "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
            "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
            "0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b",
          ]
        );

      expect(await erc721Token.ownerOf(1)).to.be.equal(buyer.address);
      expect(await erc721Token.balanceOf(buyer.address)).to.be.equal(1);
    });
    it("Buy Minted Nft ", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 2;
      let nftPrice = ethers.utils.parseEther("1");
      let royality = 100;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "testing", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, buyer.address);

      await hawks.transfer(add1.address, ethers.utils.parseEther("2"));

      await erc721Token
        .connect(buyer)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add1).approve(marketPlace.address, nftPrice);

      Lazybuy = await marketPlace
        .connect(add1)
        .LazyBuy(
          [
            nonce,
            buyer.address,
            erc721Token.address,
            hawks.address,
            1,
            100,
            nftPrice,
            sign,
            "testing",
            block.timestamp,
            block.timestamp + 100,
          ],
          ["0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6"]
        );

     
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

      let nonce = 3;
      let nftPrice = ethers.utils.parseEther("1");
      let royality = 100;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "testing", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = web3.eth.sign(messageHash, add1.address);

      let oldSellerBal = await hawks.balanceOf(add1.address);
      let oldBuyerBal = await hawks.balanceOf(add3.address);
      // console.log("oldSellBal", oldSellerBal);
      // console.log("oldBuyBal", oldBuyerBal);
      // console.log(add3.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0x9f29a6a5d033252d112ba1ecd215246354ca7488bacba05bb5678c6920a7e95b"
        );
      await hawks.transfer(add3.address, ethers.utils.parseEther("2"));
      // console.log("oldBuyBal",await hawks.balanceOf(add3.address));

      await erc721Token
        .connect(add1)
        .setApprovalForAll(marketPlace.address, true);

      await hawks
        .connect(add3)
        .approve(marketPlace.address, ethers.utils.parseEther("2"));

      let OldPlatFormBal = await erc721Token.balanceOf(marketPlace.address);
      // console.log("OLd PlatFormBal", OldPlatFormBal);

      Lazybuy = await marketPlace
        .connect(add3)
        .LazyBuy(
          [
            nonce,
            add1.address,
            erc721Token.address,
            hawks.address,
            0,
            royality,
            nftPrice,
            sign,
            "testing",
            block.timestamp,
            block.timestamp + 100,
          ],
          [
            "0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b",
            "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
          ]
        );

      expect(await erc721Token.ownerOf(2)).to.be.equal(add3.address);

      expect(await erc721Token.balanceOf(add3.address)).to.be.equal(1);

      let calculatedRoyality = (nftPrice * royality) / 10000;
      // let calculatedRoyality =  await (erc721Token.royaltyInfo(tokenId,nftPrice))
      // console.log("CalculatedRoyality", calculatedRoyality);

      let newPlatFormBal = (nftPrice * plat) / 10000;
      // console.log("New PlatFormBal", newPlatFormBal);

      // let OlatFormBal = await my.balanceOf(marketPlace.address);
      // console.log("OLd PlatFormBal", OllatFormBal);

      let remainingAmount = nftPrice - newPlatFormBal;
      // console.log("Remaining Amount", remainingAmount);

      // let ActualAmount = remainingAmount - calculatedRoyality;

      let newSellerBal = await hawks.balanceOf(add1.address);
      let newBuyerBal = await hawks.balanceOf(add3.address);
      // console.log("newSellBal", newSellerBal);
      // console.log("newBuyBal", newBuyerBal);

      expect(newSellerBal).to.equals(
        oldSellerBal.add(ethers.BigNumber.from(remainingAmount.toString()))
      );
    });

    it("Should check event", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 10;
      let nftPrice = ethers.utils.parseEther("1");
      let royality = 100;
      let plat = 250;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "teting", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = web3.eth.sign(messageHash, add3.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0xb866af8e41f266eec117e2f106ceb35f7f762ecf61d886abfec7a91d18d84ef4"
        );

      await hawks.transfer(add4.address, ethers.utils.parseEther("2"));

      await erc721Token
        .connect(add3)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add4).approve(marketPlace.address, nftPrice);
      // console.log(add4.address);
      let Lazybuy = await marketPlace
        .connect(add4)
        .LazyBuy(
          [
            nonce,
            add3.address,
            erc721Token.address,
            hawks.address,
            0,
            royality,
            nftPrice,
            sign,
            "teting",
            block.timestamp,
            block.timestamp + 100,
          ],
          [
            "0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b",
            "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
          ]
        );
      // console.log(Lazybuy);

      expect(await erc721Token.ownerOf(3)).to.be.equal(add4.address);

      expect(await erc721Token.balanceOf(add4.address)).to.be.equal(1);

      receipt = await Lazybuy.wait();
      for (const event of receipt.events) {
        //  console.log("Event Name:", event.args);
      }
      // console.log(add3.address);

      expect(await receipt.events[7].args[2]).to.be.equals(hawks.address);
      expect(await receipt.events[7].event).to.be.equals("lazy_buy");
      // console.log("Event Name: ", await receipt.events[7].event);
      // console.log("Owner Address: ", await receipt.events[7].args[2]);
    });
  });

  describe("LazyBuy Negative Cases", () => {
    it("Should check nonce", () => {
      it("Lazybuy Function", async () => {
        let blockNumber = await ethers.provider.getBlockNumber();
        let block = await ethers.provider.getBlock(blockNumber);

        let message = ethers.utils.solidityPack(
          ["address", "uint256", "string", "address", "uint256", "uint256"],
          [erc721Token.address, 1, "test", hawks.address, 200, 1]
        );
        let messageHash = ethers.utils.keccak256(message);
        let sign = await web3.eth.sign(messageHash, seller.address);

        await hawks.transfer(buyer.address, 10000);

        await erc721Token
          .connect(seller)
          .setApprovalForAll(marketPlace.address, true);

        await hawks.connect(buyer).approve(marketPlace.address, 2000);

        expect(
          await marketPlace
            .connect(buyer)
            .LazyBuy([
              1,
              seller.address,
              erc721Token.address,
              hawks.address,
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
      let nonce = 4;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 3, "test", hawks.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, add4.address);

      await hawks.transfer(buyer.address, 10000);

      await erc721Token
        .connect(add4)
        .setApprovalForAll(marketPlace.address, false);

      await hawks.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy(
            [
              nonce,
              add4.address,
              erc721Token.address,
              hawks.address,
              3,
              100,
              200,
              sign,
              "test",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
              "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
              "0x4a5a35f46430a2c06f61ebbec5f10917d2a6948a5d138dc89ecfdb15cedfe254",
            ]
          )
      ).to.be.revertedWith("MarketPlace: Collection must be approved.");
    });

    it("Should Check Seller Signature", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 5;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", hawks.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, buyer.address);

      await hawks.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, false);

      await hawks.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy(
            [
              nonce,
              seller.address,
              erc721Token.address,
              hawks.address,
              1,
              100,
              200,
              sign,
              "test",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
              "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
              "0x4a5a35f46430a2c06f61ebbec5f10917d2a6948a5d138dc89ecfdb15cedfe254",
            ]
          )
      ).to.be.revertedWith(
        "MarketPlace: sellerAddress sign verification failed"
      );
    });

    it("Check invalid signature length", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 6;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "test", hawks.address, 200, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);

      await hawks.transfer(buyer.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(buyer).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(buyer)
          .LazyBuy(
            [
              nonce,
              seller.address,
              erc721Token.address,
              hawks.address,
              1,
              100,
              200,
              "0x4b7146d6dc30cd551dd60c5d6fa6ea20428d9ee2e12fea43f33c9b1f12b034456bb3646cf6cb2f8ae667d2d7a2b8bd8e1600651d7b13708c366e6b2f4aae37c3",
              "test",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
              "0x7e0eefeb2d8740528b8f598997a219669f0842302d3c573e9bb7262be3387e63",
              "0x4a5a35f46430a2c06f61ebbec5f10917d2a6948a5d138dc89ecfdb15cedfe254",
            ]
          )
      ).to.be.revertedWith("MarketPlace: invalid signature length.");
    });

    it("Should check Token Allowance", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 7;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "testing", hawks.address, 300, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, add1.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0x6163cc433d8d19c174b8de27d5a8a3137096e05bdc8b95e7848d8fc8ee8e2dcd"
        );

      await hawks.transfer(add2.address, 10000);

      await erc721Token
        .connect(add1)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add2).approve(marketPlace.address, 50);

      await expect(
        marketPlace
          .connect(add2)
          .LazyBuy(
            [
              nonce,
              add1.address,
              erc721Token.address,
              hawks.address,
              1,
              100,
              300,
              sign,
              "testing",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xb6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108",
              "0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b",
              "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
            ]
          )
      ).to.be.revertedWith("MarketPlace: Check the token allowance.");
    });

    it("Should check Balance", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nonce = 8;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [
          erc721Token.address,
          1,
          "testing",
          hawks.address,
          1000000000000000,
          nonce,
        ]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, add1.address);

      // await hawks.transfer(add2.address, 10000);

      await erc721Token
        .connect(add1)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add2).approve(marketPlace.address, 1000);

      await expect(
        marketPlace
          .connect(add2)
          .LazyBuy(
            [
              nonce,
              add1.address,
              erc721Token.address,
              hawks.address,
              1,
              100,
              1000000000000000,
              sign,
              "testing",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xb6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108",
              "0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b",
              "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
            ]
          )
      ).to.be.revertedWith("MarketPlace: Insufficient Amount");
    });
    it("Should check user is Blacklist or not", async () => {
      let black = await blacklist.AddRemoveBlacklist(add5.address);
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nftPrice = 200;
      let nonce = 9;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "test", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0xfe998a20cc647938e07bd0bd67ab2ce9edc7aecc0e7e10a539d7a3abd5d09651"
        );
      await hawks.transfer(add5.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add5).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(add5)
          .LazyBuy(
            [
              nonce,
              seller.address,
              erc721Token.address,
              hawks.address,
              0,
              100,
              nftPrice,
              sign,
              "test",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xb6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108",
              "0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b",
              "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
              "0x51494c771c377610540e8b9b86186216a64dcf73a7ab57ec2c5953286f059f60",
            ]
          )
      ).to.be.revertedWith("MarketPlace: user is blacklisted");
    });
    it("Should check user is whitelisted or not", async () => {
      let black = await blacklist.AddRemoveBlacklist(add5.address);
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let nftPrice = 200;
      let nonce = 9;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 0, "test", hawks.address, nftPrice, nonce]
      );
      let messageHash = ethers.utils.keccak256(message);
      let sign = await web3.eth.sign(messageHash, seller.address);
      await marketPlace
        .connect(seller)
        .setMerkleRoot(
          "0xfe998a20cc647938e07bd0bd67ab2ce9edc7aecc0e7e10a539d7a3abd5d09651"
        );
      await hawks.transfer(add5.address, 10000);

      await erc721Token
        .connect(seller)
        .setApprovalForAll(marketPlace.address, true);

      await hawks.connect(add5).approve(marketPlace.address, 2000);

      await expect(
        marketPlace
          .connect(add5)
          .LazyBuy(
            [
              nonce,
              seller.address,
              erc721Token.address,
              hawks.address,
              0,
              100,
              nftPrice,
              sign,
              "test",
              block.timestamp,
              block.timestamp + 100,
            ],
            [
              "0xb6711c87f5d70aa0ec9dcbff648cab4ede7aec7218e4e2fef065f83253fc9108",
              "0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b",
              "0xd4453790033a2bd762f526409b7f358023773723d9e9bc42487e4996869162b6",
              "0x51494c771c377610540e8b9b86186216a64dcf73a7ab57ec2c5953286f059f67",
            ]
          )
      ).to.be.revertedWith("InvalidProof()");
    });
  });
});
