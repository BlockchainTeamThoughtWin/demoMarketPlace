const { expect } = require("chai");
const hre = require("hardhat");
const { ethers, web3 } = require("hardhat");

let platFormFeePercent = 250;
let nonce,
    sellerAddress,
    tokenId,
    royalty,
    amount,
    tokenUri;

let winnerAddress,
    winnerAmount;

let oldPlatFormFee;

describe("marketplace", () => {
    before(async () => {
        let accounts = await hre.ethers.getSigners();
        [
            seller,
            userA,
            userB,
            seller1,
            winner,
            winner2,
            add1,
            add2,
            add3,
            add4,
            _,
        ] = accounts;

        //Blacklist 
        BlackList = await hre.ethers.getContractFactory("BlackList");
        blacklist = await BlackList.deploy();

        //NFT721 Deployed
        let ERC721TokenV2 = await hre.ethers.getContractFactory("ERC721TokenV2");
        ercToken = await upgrades.deployProxy(ERC721TokenV2, [500, blacklist.address], {
            initializer: "initialize",
        });
        await ercToken.deployed();
        console.log("ERC721 address,", ercToken.address);

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
            expect(await marketPlace.platFormFeePercent())
            .to.be.equals
            (platFormFeePercent);
            // expect(await marketPlace.platFormFeePercent()).to.be.equals(250);

        });


        it("lazy Auction function", async () => {
            nonce = 1;
            sellerAddress = seller1.address;


            tokenId = 0;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = winner.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(winner).approve(marketPlace.address, winnerAmount);
            await marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails);
            expect(await ercToken.ownerOf(1)).to.be.equal(winnerAddress);
            let royaltyInfo = await ercToken.royaltyInfo(tokenId, winnerAmount);
            console.log("royaltyInfo1", royaltyInfo);
            console.log("balance of t_id 2", await eth.balanceOf(sellerAddress));
            console.log("seller1 add", seller1.address);
        });

        it("should check platFormFees", async () => {

            let PlatFormFee = (winnerAmount * platFormFeePercent) / 10000;
            console.log("PlatFormFee", PlatFormFee);
            // expect(await ercToken.ownerOf(2)).to.be.equal(userA.address);
            let newPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("New PlatformFee", ethers.BigNumber.from(newPlatFormFee));

            expect(await newPlatFormFee).to.be.equal(oldPlatFormFee.add(PlatFormFee));

            console.log("Total supply", await ercToken.totalSupply());


        });

        it("should check Royalty", async () => {

            nonce = 2;
            sellerAddress = winner.address;
            amount = 300;
            tokenId = 1;
            winnerAddress = add1.address;
            winnerAmount = 400;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, "URI", eth.address, amount, nonce]
            );
            let messageHash = ethers.utils.keccak256(message);

            sellerSign2 = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller2 Sign", sellerSign2);

            let sellerStruct = [

                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign2,
                "URI",
                block.timestamp,
                block.timestamp + 100,
            ];

            //winner Sign

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );

            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            winnerSign2 = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner2 sign", winnerSign2);

            let winnerStruct = [
                winnerAddress,
                winnerAmount,
                winnerSign2,
                block.timestamp,
                nonce
            ];
            let oldOwnerbal = await eth.balanceOf(seller1.address);
            await ercToken.connect(winner).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(add1).approve(marketPlace.address, winnerAmount);
            console.log("Old Balance of winner", await eth.balanceOf(winnerAddress));
            await marketPlace.connect(add1).lazyAuction(sellerStruct, winnerStruct);
            console.log("New Balance of winner", await eth.balanceOf(winnerAddress));

            let PlatformFee = (winnerAmount * platFormFeePercent) / 10000;
            console.log("Platformfee", PlatformFee);

            let royaltyInfo = await ercToken.royaltyInfo(
                tokenId,
                winnerAmount,
            );
            console.log("Royalty", royaltyInfo);
            expect(await eth.balanceOf(seller1.address))
            .to.be.equals
            (oldOwnerbal.add(royaltyInfo[1]))
            expect(await ercToken.ownerOf(tokenId)).to.be.equals(add1.address)
            console.log("balance of new t_id 2", await eth.balanceOf(seller1.address));
        });
    });

    describe("lazyAuction Negative cases", () => {
        it("should check user is blacklisted or not", async () => {
            await blacklist.AddRemoveBlacklist(add2.address);

            nonce = 3;
            sellerAddress = add1.address;
            amount = 400;
            tokenId = 1;
            winnerAddress = add2.address;
            winnerAmount = 500;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, "URI", eth.address, amount, nonce]
            );
            let messageHash = ethers.utils.keccak256(message);

            sellerSign2 = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller2 Sign", sellerSign2);

            let sellerStruct = [

                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign2,
                "URI",
                block.timestamp,
                block.timestamp + 100,
            ];

            //winner Sign

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );

            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            winnerSign2 = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner2 sign", winnerSign2);

            let winnerStruct = [
                winnerAddress,
                winnerAmount,
                winnerSign2,
                block.timestamp,
                nonce
            ];

            await ercToken.connect(winner).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(add2).approve(marketPlace.address, winnerAmount);
            console.log("Old Balance of winner", await eth.balanceOf(winnerAddress));
            await expect(marketPlace.connect(add2).lazyAuction(sellerStruct, winnerStruct)).to.be.revertedWith("user is blacklisted");
            console.log("New Balance of winner", await eth.balanceOf(winnerAddress));
        });

        it("should check nonce", async () => {
            nonce = 1;
            sellerAddress = seller1.address;


            tokenId = 1;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = winner.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(winner).approve(marketPlace.address, winnerAmount);
            await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails)).to.be.revertedWith("MarketPlace: nonce already process");
        });

        it("should verify seller signature", async () => {

            nonce = 4;
            sellerAddress = seller1.address;


            tokenId = 1;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = winner.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, add1.address);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(winner).approve(marketPlace.address, winnerAmount);
            await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails))
            .to.be.revertedWith
            ("MarketPlace: sellerAddress sign verification failed");
        });

        it("should verify winner signature", async () => {
            nonce = 5;
            sellerAddress = seller1.address;


            tokenId = 1;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = winner.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, add1.address);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(winner).approve(marketPlace.address, winnerAmount);
            await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails))
            .to.be.revertedWith
            ("MarketPlace: winner sign verification failed");
        });

        it("should check address approval", async () => {
            nonce = 6;
            sellerAddress = add3.address;


            tokenId = 0;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = add4.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            // await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            // await eth.connect(winner).approve(marketPlace.address, winnerAmount);
            await expect(marketPlace.connect(add4).lazyAuction(sellerDetails, winnerDetails))
            .to.be.revertedWith
            ("MarketPlace: address not approve");
        });

        it("Check Fund", async () => {

            nonce = 7;
            sellerAddress = add4.address;


            tokenId = 0;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = add3.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            oldPlatFormFee = await eth.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



            await ercToken.connect(add4).setApprovalForAll(marketPlace.address, true);
            // await eth.transfer(winnerAddress, 600);
            await eth.connect(add3).approve(marketPlace.address, winnerAmount);
            await expect(marketPlace.connect(add3).lazyAuction(sellerDetails, winnerDetails))
                .to.be.revertedWith
                ("MarketPlace: Insuficent fund");
        });

        it("Should check the token allowance", async () => {
            nonce = 7;
            sellerAddress = add4.address;


            tokenId = 0;
            royalty = 300;
            amount = 200;
            tokenUri = "uri";


            winnerAddress = add3.address;

            winnerAmount = 300;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                eth.address,
                tokenId,
                royalty,
                amount,
                sellerSign,
                tokenUri,
                block.timestamp,
                block.timestamp + 100,
            ];

            let winnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAddress, winnerAmount, block.timestamp, nonce]
            );
            let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

            //winner sign
            winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
            console.log("Winner Sign:", winnerSign);


            let winnerDetails = [
                winnerAddress,
                winnerAmount,
                winnerSign,
                block.timestamp,
                nonce,
            ];

            await ercToken.connect(add4).setApprovalForAll(marketPlace.address, true);
            await eth.transfer(winnerAddress, 600);
            await eth.connect(add3).approve(marketPlace.address, 100);
            await expect(marketPlace.connect(add3).lazyAuction(sellerDetails, winnerDetails))
                .to.be.revertedWith
                ("MarketPlace: Check the token allowance.");
        });
    })
})