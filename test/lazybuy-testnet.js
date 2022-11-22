const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");

let seller, buyer;

describe("NFTCollection", async () => {
  before(async () => {
    let accounts = await ethers.getSigners();
    [seller, buyer] = accounts;

    ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
    erc721Token = await ERC721Token.attach(
      "0x86B207E66e0eC5E3247A333d46f3a38Fa7b4cfCF"
    );

    MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
    marketPlace = await MarketPlace.attach(
      "0x304CD45F5B4cf3FB3e0088895C25434b0aF4bb84"
    );

    ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    myToken = ERC20Token.attach("0x53D362b6febE995Bd3FA61a0333f1D2758e22A2e");

    BlackList = await hre.ethers.getContractFactory("BlackList");
    BlackList = await BlackList.attach(
      "0xed76AB40961a813d832a65deb96Ab14340bcD98E"
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

