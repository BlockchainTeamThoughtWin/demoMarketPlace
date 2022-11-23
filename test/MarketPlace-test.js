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

describe("Marketplace",async () => {
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
        let ERC721Token = await hre.ethers.getContractFactory("ERC721Token");
        ercToken = await upgrades.deployProxy(ERC721Token, [500, blacklist.address], {
            initializer: "initialize",
        });
        await ercToken.deployed();
        console.log("ERC721 address,", ercToken.address);

        //ERC20Token Deolpoyed
        Hawks = await hre.ethers.getContractFactory("Hawks");
        Hawks = await Hawks.deploy();
        await Hawks.deployed();
        console.log("Hawks address,", Hawks.address);

        //Marketplace Deployed
        Marketplace = await hre.ethers.getContractFactory("MarketPlace");
        marketPlace = await upgrades.deployProxy(Marketplace, [blacklist.address], {
            initializer: "initialize",
        });
        await marketPlace.deployed();
        console.log("marketplace address", marketPlace.address);
        console.log("Seller Address",seller.address);
        console.log("Add1 address", add1.address);
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
            amount =600;
            tokenUri = "uri";


            winnerAddress = winner.address;

            winnerAmount =800;

            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);
            console.log("winner Address",winner.address)
            //seller Sign
            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, tokenUri, Hawks.address, amount, nonce]

            );
            let messageHash = ethers.utils.keccak256(message);

            //seller Sign
            sellerSign = await web3.eth.sign(messageHash, sellerAddress);
            console.log("Seller Sign:", sellerSign);


            let sellerDetails = [
                nonce,
                sellerAddress,
                ercToken.address,
                Hawks.address,
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

            oldPlatFormFee = await Hawks.balanceOf(marketPlace.address);
            console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));

            let proof = [
                "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
                // "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
                // "0xf6d82c545c22b72034803633d3dda2b28e89fb704f3c111355ac43e10612aedc"
              ];
            
            await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
            let oldPlatformFeeAmunt = await Hawks.balanceOf(marketPlace.address);
            console.log("Olddddd",oldPlatformFeeAmunt);
           
            await Hawks.transfer(winnerAddress, 10000);
            await Hawks.connect(winner).approve(marketPlace.address, 1000);
            await marketPlace.connect(seller).setMerkleRoot("0x9e1d84ca9c7548b9920bc4881db28863cc28dcc8447bac67b0881621aa70ac1b")
            await marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails,proof,true);
            let Plat = (winnerAmount*platFormFeePercent)/10000
            console.log("hjhjjhjjjj",Plat);
            let NewPlatformFeeAmunt = await Hawks.balanceOf(marketPlace.address);
            console.log("Newwwww",NewPlatformFeeAmunt);
           
            expect(await ercToken.ownerOf(1)).to.be.equal(winnerAddress);
            let royaltyInfo = await ercToken.royaltyInfo(tokenId, winnerAmount);
            console.log("royaltyInfo1", royaltyInfo);
            console.log("balance of t_id 2", await Hawks.balanceOf(sellerAddress));
            console.log("seller1 add", seller1.address);
            console.log("New Platform Bal", await Hawks.balanceOf(marketPlace.address));

        // });

      
  it("Should check the platform Fees", async() => {
    
      
    let PlatFormFee = (winnerAmount * platFormFeePercent) / 10000;
   
   
    let newPlatformFeeAmunt = await Hawks.balanceOf(marketPlace.address);
    console.log("New PlatformFee", ethers.BigNumber.from(newPlatFormFee));

    expect(newPlatformFeeAmunt).to.be.equal(oldPlatformFeeAmunt.add(PlatFormFee));

     
});

  

        });

        // it("should check Royalty", async () => {

        //     nonce = 2;
        //     sellerAddress = winner.address;
        //     amount = 300;
        //     tokenId = 1;
        //     winnerAddress = add1.address;
        //     winnerAmount = 400;

        //     let blockNumber = await ethers.provider.getBlockNumber();
        //     let block = await ethers.provider.getBlock(blockNumber);

        //     //seller Sign
        //     let message = ethers.utils.solidityPack(
        //         ["address", "uint256", "string", "address", "uint256", "uint256"],
        //         [ercToken.address, tokenId, "URI", Hawks.address, amount, nonce]
        //     );
        //     let messageHash = ethers.utils.keccak256(message);

        //     sellerSign2 = await web3.eth.sign(messageHash, sellerAddress);
        //     console.log("Seller2 Sign", sellerSign2);

        //     let sellerStruct = [

        //         nonce,
        //         sellerAddress,
        //         ercToken.address,
        //         Hawks.address,
        //         tokenId,
        //         royalty,
        //         amount,
        //         sellerSign2,
        //         "URI",
        //         block.timestamp,
        //         block.timestamp + 100,
        //     ];

        //     //winner Sign

        //     let winnerMessage = ethers.utils.solidityPack(
        //         ["address", "uint256", "uint256", "uint256"],
        //         [winnerAddress, winnerAmount, block.timestamp, nonce]
        //     );

        //     let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

        //     winnerSign2 = await web3.eth.sign(winnerMessageHash, winnerAddress);
        //     console.log("Winner2 sign", winnerSign2);

        //     let winnerStruct = [
        //         winnerAddress,
        //         winnerAmount,
        //         winnerSign2,
        //         block.timestamp,
        //         nonce
        //     ];

        //     let proof = [
        //         '0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b'
        //       ];

        //     let oldOwnerbal = await Hawks.balanceOf(seller1.address);
        //     console.log("Old Owner Bal", oldOwnerbal);
        //     await ercToken.connect(winner).setApprovalForAll(marketPlace.address, true);
        //     await Hawks.transfer(winnerAddress, 7000);
        //     await Hawks.connect(add1).approve(marketPlace.address, 6000);
        //     console.log("Old Balance of winner", await Hawks.balanceOf(winnerAddress));
        //     await marketPlace.connect(seller).setMerkleRoot("0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b")
        //      await marketPlace.connect(add1).lazyAuction(sellerStruct, winnerStruct, proof);
        //     console.log("New Balance of winner", await Hawks.balanceOf(winnerAddress));

        //     let PlatformFee = (winnerAmount * platFormFeePercent) / 10000;
        //     console.log("Platformfee", PlatformFee);

        //     let royaltyInfo = await ercToken.royaltyInfo(
        //         tokenId,
        //         winnerAmount,
        //     );

        //     let Roy = (winnerAmount*royalty)/10000;
        //     console.log("kkkkkkkk",Roy);
        //     console.log("Royalty", royaltyInfo);
        //     let NewOwnerBal =await Hawks.balanceOf(seller1.address);
        //     console.log("New Owner Bal",NewOwnerBal);
        //     // expect(await Hawks.balanceOf(seller1.address))
        //     // .to.be.equals
        //     // (oldOwnerbal.add(royaltyInfo[1]))
        //     expect(await ercToken.ownerOf(tokenId)).to.be.equals(add1.address)
        //     console.log("balance of new t_id 2", await Hawks.balanceOf(seller1.address));
        // });
        
        it("should check royalty", async () =>{
            nonce = 2,
            tokenId = 1,
            sellerAdd = winner.address,
            winnerAdd = add1.address,
            sellerAmount = 800,
            winnerAm = 900;
            
            let blockNumber = await ethers.provider.getBlockNumber();
            let block = await ethers.provider.getBlock(blockNumber);

            //sellerSign

            let message = ethers.utils.solidityPack(
                ["address", "uint256", "string", "address", "uint256", "uint256"],
                [ercToken.address, tokenId, "URI", Hawks.address, sellerAmount, nonce]
            );

            let messageHash = ethers.utils.keccak256(message);

            sellerSign2 = await web3.eth.sign(messageHash, sellerAdd);

            let sellerStruct = [
                nonce,
                sellerAdd,
                ercToken.address,
                Hawks.address,
                tokenId,
                royalty,
                sellerAmount,
                sellerSign2,
                "URI",
                block.timestamp,
                block.timestamp + 100,
            ];

            //WinnerSign

            let WinnerMessage = ethers.utils.solidityPack(
                ["address", "uint256", "uint256", "uint256"],
                [winnerAdd, winnerAm, block.timestamp, nonce]
            );

           let winnerHash = ethers.utils.keccak256(WinnerMessage);

           winnerSign2 = await web3.eth.sign(winnerHash, winnerAdd);

           let winnerStruct = [
            winnerAdd,
            winnerAm,
            winnerSign2,
            block.timestamp,
            nonce,
           ];

           let proof = [
                    '0xf4ca8532861558e29f9858a3804245bb30f0303cc71e4192e41546237b6ce58b'
                  ];
            console.log("ergthjuyi",await Hawks.balanceOf(add1.address));

            await marketPlace.connect(seller).setMerkleRoot("0x86e4758919e8a5ac58f2df266df38c6563731b20b0259c60638f1582b1aeb22b");
            await ercToken.connect(winner).setApprovalForAll(marketPlace.address, true);
            await Hawks.transfer(winnerAdd, 10000);
            await Hawks.connect(add1).approve(marketPlace.address, 2000);
            await marketPlace.connect(add1).lazyAuction(sellerStruct, winnerStruct, proof,true);
            console.log(await Hawks.balanceOf(add1.address));


        })
    
    });  

    // describe("lazyAuction Negative cases", () => {
    //     it("should check user is blacklisted or not", async () => {
    //         await blacklist.AddRemoveBlacklist(add2.address);

    //         nonce = 3;
    //         sellerAddress = add1.address;
    //         amount = 400;
    //         tokenId = 1;
    //         winnerAddress = add2.address;
    //         winnerAmount = 500;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, "URI", eth.address, amount, nonce]
    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         sellerSign2 = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller2 Sign", sellerSign2);

    //         let sellerStruct = [

    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign2,
    //             "URI",
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         //winner Sign

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );

    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         winnerSign2 = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner2 sign", winnerSign2);

    //         let winnerStruct = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign2,
    //             block.timestamp,
    //             nonce
    //         ];

    //         await ercToken.connect(winner).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         await eth.connect(add2).approve(marketPlace.address, winnerAmount);
    //         console.log("Old Balance of winner", await eth.balanceOf(winnerAddress));
    //         await expect(marketPlace.connect(add2).lazyAuction(sellerStruct, winnerStruct)).to.be.revertedWith("user is blacklisted");
    //         console.log("New Balance of winner", await eth.balanceOf(winnerAddress));
    //     });

    //     it("should check nonce", async () => {
    //         nonce = 1;
    //         sellerAddress = seller1.address;


    //         tokenId = 1;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = winner.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         oldPlatFormFee = await eth.balanceOf(marketPlace.address);
    //         console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



    //         await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         await eth.connect(winner).approve(marketPlace.address, winnerAmount);
    //         await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails)).to.be.revertedWith("MarketPlace: nonce already process");
    //     });

    //     it("should verify seller signature", async () => {

    //         nonce = 4;
    //         sellerAddress = seller1.address;


    //         tokenId = 1;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = winner.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, add1.address);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         oldPlatFormFee = await eth.balanceOf(marketPlace.address);
    //         console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



    //         await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         await eth.connect(winner).approve(marketPlace.address, winnerAmount);
    //         await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails))
    //         .to.be.revertedWith
    //         ("MarketPlace: sellerAddress sign verification failed");
    //     });

    //     it("should verify winner signature", async () => {
    //         nonce = 5;
    //         sellerAddress = seller1.address;


    //         tokenId = 1;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = winner.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, add1.address);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         oldPlatFormFee = await eth.balanceOf(marketPlace.address);
    //         console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



    //         await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         await eth.connect(winner).approve(marketPlace.address, winnerAmount);
    //         await expect(marketPlace.connect(winner).lazyAuction(sellerDetails, winnerDetails))
    //         .to.be.revertedWith
    //         ("MarketPlace: winner sign verification failed");
    //     });

    //     it("should check address approval", async () => {
    //         nonce = 6;
    //         sellerAddress = add3.address;


    //         tokenId = 0;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = add4.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         oldPlatFormFee = await eth.balanceOf(marketPlace.address);
    //         console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



    //         // await ercToken.connect(seller1).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         // await eth.connect(winner).approve(marketPlace.address, winnerAmount);
    //         await expect(marketPlace.connect(add4).lazyAuction(sellerDetails, winnerDetails))
    //         .to.be.revertedWith
    //         ("MarketPlace: address not approve");
    //     });

    //     it("Check Fund", async () => {

    //         nonce = 7;
    //         sellerAddress = add4.address;


    //         tokenId = 0;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = add3.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         oldPlatFormFee = await eth.balanceOf(marketPlace.address);
    //         console.log("Marketplace Balance", ethers.BigNumber.from(oldPlatFormFee));



    //         await ercToken.connect(add4).setApprovalForAll(marketPlace.address, true);
    //         // await eth.transfer(winnerAddress, 600);
    //         await eth.connect(add3).approve(marketPlace.address, winnerAmount);
    //         await expect(marketPlace.connect(add3).lazyAuction(sellerDetails, winnerDetails))
    //             .to.be.revertedWith
    //             ("MarketPlace: Insuficent fund");
    //     });

    //     it("Should check the token allowance", async () => {
    //         nonce = 7;
    //         sellerAddress = add4.address;


    //         tokenId = 0;
    //         royalty = 300;
    //         amount = 200;
    //         tokenUri = "uri";


    //         winnerAddress = add3.address;

    //         winnerAmount = 300;

    //         let blockNumber = await ethers.provider.getBlockNumber();
    //         let block = await ethers.provider.getBlock(blockNumber);

    //         //seller Sign
    //         let message = ethers.utils.solidityPack(
    //             ["address", "uint256", "string", "address", "uint256", "uint256"],
    //             [ercToken.address, tokenId, tokenUri, eth.address, amount, nonce]

    //         );
    //         let messageHash = ethers.utils.keccak256(message);

    //         //seller Sign
    //         sellerSign = await web3.eth.sign(messageHash, sellerAddress);
    //         console.log("Seller Sign:", sellerSign);


    //         let sellerDetails = [
    //             nonce,
    //             sellerAddress,
    //             ercToken.address,
    //             eth.address,
    //             tokenId,
    //             royalty,
    //             amount,
    //             sellerSign,
    //             tokenUri,
    //             block.timestamp,
    //             block.timestamp + 100,
    //         ];

    //         let winnerMessage = ethers.utils.solidityPack(
    //             ["address", "uint256", "uint256", "uint256"],
    //             [winnerAddress, winnerAmount, block.timestamp, nonce]
    //         );
    //         let winnerMessageHash = ethers.utils.keccak256(winnerMessage);

    //         //winner sign
    //         winnerSign = await web3.eth.sign(winnerMessageHash, winnerAddress);
    //         console.log("Winner Sign:", winnerSign);


    //         let winnerDetails = [
    //             winnerAddress,
    //             winnerAmount,
    //             winnerSign,
    //             block.timestamp,
    //             nonce,
    //         ];

    //         await ercToken.connect(add4).setApprovalForAll(marketPlace.address, true);
    //         await eth.transfer(winnerAddress, 600);
    //         await eth.connect(add3).approve(marketPlace.address, 100);
    //         await expect(marketPlace.connect(add3).lazyAuction(sellerDetails, winnerDetails))
    //             .to.be.revertedWith
    //             ("MarketPlace: Check the token allowance.");
    //     });
    // })
})