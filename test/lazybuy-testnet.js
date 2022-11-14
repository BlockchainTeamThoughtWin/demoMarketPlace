const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");

let seller, buyer;

describe("NFTCollection", async () => {
  before(async () => {
    let accounts = await ethers.getSigners();
    [seller, buyer] = accounts;

    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0x8C5198983cF2A943547cc83752787bB059bA670A"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0xCC05DAEA405b538b1076429540207Cc01aCca4d6"
    );

    ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = ERC20Token.attach("0x602d54400e53C2BBC28845CF657d77E7Ffb37286");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    BlackList = await BlackList.attach(
      "0x9D4c68F636b668Db6974CA35c2E97986b6c016b8"
    );
  });


  
  describe("Testing MarketPlace Functions",() => {

    it("Should LazyBuy Minted NFT", async () => {
      let BlockNumber = await ethers.provider.getBlockNumber();
      let Block = await ethers.provider.getBlock(BlockNumber);
      let SellerPrivate = "fa27394e98fadce31d62e0ef49adad668abd76abbd953d46f1b2c7f1d23d6e62"
      await marketPlace.connect(seller).setMerkleRoot("0x50ca27b1887acf96843d5c597c4448e9ca7ba49b04d71c75a2009136de0fb74b")
      let NFTPrice = 200;
      let Nonce = 24;
      let Royality = 250;
      let PlatFee = 250;

      let message = ethers.utils.solidityPack(
        ["address", "uint256", "string", "address", "uint256", "uint256"],
        [erc721Token.address, 1, "DemoTest", myToken.address, NFTPrice, Nonce]
      );

      let messageHash = ethers.utils.keccak256(message);
      let SellerSign = await web3.eth.accounts.sign(messageHash, SellerPrivate);

    await myToken.transfer(buyer.address, NFTPrice);
    await erc721Token.connect(seller).setApprovalForAll(marketPlace.address, true);
    await myToken.connect(buyer).approve(marketPlace.address,NFTPrice);  

     lazyBuy = await marketPlace.connect(buyer).LazyBuy([
        Nonce,
        seller.address,
        erc721Token.address,
        myToken.address,
        1,
        Royality,
        NFTPrice,
        SellerSign.signature,
        "DemoTest",
        Block.timestamp,
        Block.timestamp + 100,
      ], ["0x29acd41530d944a4717b04caa3a9503528eeea474d1b1359b7963ebc8d032720"])
  })

})
})

// [24,"0x2736e3A9db02ff29Eb328f31f8437dea325336F4","0x8C5198983cF2A943547cc83752787bB059bA670A","0x602d54400e53C2BBC28845CF657d77E7Ffb37286",0,250,200,"0xb1578ffa2aec401ccd20b468244ef63af83c4df8ff440acb1cc829ff3fa1150c68c201f2c29414e94bf0ab7f12e7ab571466e6fb22901cbc1af5eb8f982196a41c","DemoTest",1668423332,1668423432]