const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");
// const { Logger } = require("mongodb");

let owner = "0x98D69FbC69d164A63ce46984750d25749ce5E87e";
let privatekey =
  "13b110e7ac194d2827d04f17c11726068bb2dc19b595b5a33acaf7fc15604e1b";
  let owner1, seller, buyer


describe("NFTCollection", async () => {

  before(async () => {
    let accounts = await ethers.getSigners();
    [owner1, seller, buyer] = accounts

    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0xb77a802Fd7d0c6628B4A664Ac8760e3E263B86E9"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0xd7D7D107b3703A8c4487ACEF8Dd6241e11E5e831"
    );

    ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = ERC20Token.attach("0x15C3bB07889A2a94Ee913d58a54FF2274E0B5F70");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    BlackList = await BlackList.attach(
      "0x6477eF12bFAB0F83F1bf8b9782E99bd54bF4FbD7"
    );
  });

  describe("Should create collection", () => {
    it("Should mint", async () => {
      let blockNumber = await ethers.provider.getBlockNumber();
      let block = await ethers.provider.getBlock(blockNumber);
      let privatekey =
        "020fe9e134d82232b7d370014c63d73a1015a17e7f6b3ab6e48d0d1f9ac9ace2";
      // let buyer = "0x98D69FbC69d164A63ce46984750d25749ce5E87e";
     
      //  let seller = "0xf679D11faA68D720F740aEB49616ab558e233f8F";
       nftPrice = 300;

      let nonce = 3;
      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [
          "0xb77a802Fd7d0c6628B4A664Ac8760e3E263B86E9",
          1,
          "test",

          "0x15C3bB07889A2a94Ee913d58a54FF2274E0B5F70",
          nftPrice,

          nonce,
        ]
      );

      let messageHash = ethers.utils.keccak256(message);
      let sign = web3.eth.accounts.sign(messageHash, privatekey);
      console.log(sign);
      let Signer = await marketPlace.getSigner(
        messageHash,
        sign.signature.toString()
      );
      console.log(Signer);

      // await myToken.transfer(buyer, 10000);

      // await erc721Token
      //   .connect(seller)
      //   .setApprovalForAll(marketPlace.address, true);

      // await myToken.connect(buyer).approve(marketPlace.address, 2000);
      console.log("Signature: ", Signer);
      // console.log([
      //   nonce,
      //   seller,
      //   erc721Token.address,
      //   myToken.address,
      //   1,
      //   50,
      //   nftPrice,
      //   sign.signature,
      //   "tet",
      //   block.timestamp,
      //   block.timestamp + 100,
      // ]);
      



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
          sign.signature,
          "test",
          block.timestamp,
          block.timestamp + 100,
        ]);

       
      // let receipt = await nftCollection1.mint(
      // let verifySign = await marketPlace.verifySellerSign([
      //   14,
      //   "0x2736e3A9db02ff29Eb328f31f8437dea325336F4",
      //   "0x86B207E66e0eC5E3247A333d46f3a38Fa7b4cfCF",
      //   "0xCC05DAEA405b538b1076429540207Cc01aCca4d6",
      //   1,
      //   100,
      //   200,
      //   sign,
      //   "tet",
      //   block.timestamp,
      //   block.timestamp + 100,
      // ]);

      // console.log("Signature: ", verifySign);

      //   quantity,
      //   nonce,
      //   sign.signature,
      //   true,
      //   { from: "0x678fee76722fcDB047543fB7Fb92821e6E19F8db", value: amount }
      // );
      // console.log("receipt: ", receipt);
    });
  });
});

// nonce : 11
// signature : "0x6c9d63fe94334d61455948001c0e6b5831c6e342ddd594c62821399829ef0ca74a0b0d60570dc94b4e47fc0e459772f341cef1cf359ef96cec46cddeb7370b8e1b"
// isWhiteListed : false
// amount : 0.003
