const { expect } = require("chai");
const hre = require("hardhat");
const { ethers, web3 } = require("hardhat");

let platFormFeePercent = 250;

describe("marketplace", () => {
    before(async () => {
        let accounts = await hre.ethers.getSigners();
        [
            seller,
            userA,
            userB,
            _,
        ] = accounts;

        //Blacklist 
        BlackList = await hre.ethers.getContractFactory("BlackList");
        blacklist = await BlackList.deploy();

        //NFT721 Deployed
        ERC721TokenV2 = await hre.ethers.getContractFactory("ERC721TokenV2");
        NFT = await upgrades.deployProxy(ERC721TokenV2, [500, blacklist.address], {
            initializer: "initialize",
        });
        await NFT.deployed();
        console.log("ERC721 address,", NFT.address);



        //ERC20Token Deolpoyed
        ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
        eth = await ERC20Token.deploy("10000000000000000000");
        await eth.deployed();
        console.log("ERC20 address,", eth.address);

        //Marketplace Deployed
        Marketplace = await hre.ethers.getContractFactory("MarketPlace");
        marketPlace = await upgrades.deployProxy(Marketplace, [blacklist.address], {
            initializer: "initialize",
        });
        await marketPlace.deployed();
        console.log("marketplace address", marketPlace.address);

    });

    describe("lazyAuction success cases", () => {
        it("should set platform fees", async () => {
            platFormFeePercent = 300;
            await marketPlace.setPlatFormFeePercent(platFormFeePercent);
            console.log("Marketplace", await marketPlace.platFormFeePercent());
            expect(await marketPlace.platFormFeePercent()).to.be.equals(platFormFeePercent);

            // expect(await marketPlace.platFormFeePercent()).to.be.equals(250);

        });
        it("lazy Auction function", async () =>{

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address","uint256","string","address","uint256","uint256"],
                [NFT.address,1,"uri",eth.address,200,0]
            
            );
            let messageHash = ethers.utils.keccak256(message);
            sellerSign = await web3.eth.sign(messageHash,seller.address);
            console.log("Seller Sign:",sellerSign);


            let sellerDetails = [
                0,
                seller,
                NFT.address,
                eth.address,
                1,
                200,
                300,
                sellerSign,
                "uri",
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address","uint256","uint256","uint256"],
                [userA.address,400,block.timestamp,1]
            );
             let winnerMessageHash = ethers.utils.keccak256(winnerMessage);
            winnerSign = await web3.eth.sign(winnerMessageHash,userA.address);
            console.log("Winner Sign:",winnerSign);


            let winnerDetails = [
                userA.address,
                400,
                winnerSign,
                block.timestamp,
                1,
            ];

            await NFT.connect(seller).setApprovalForAll(marketPlace.address, true);
           
            await eth.connect(userA).approve(marketPlace.address, 5000);

            await marketPlace.connect(userA).lazyAuction(sellerDetails,winnerDetails);
            // expect(await NFT.ownerOf(1)).to.be.equal(userA.address);
        })
    })
})