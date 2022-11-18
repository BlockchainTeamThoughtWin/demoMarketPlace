let mongoose = require('mongoose');
let NFTDetails = require('../model/nftDetailsSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

// describe('NFTDetail', () => {
//     beforeEach((done) => {
//         NFTDetails.deleteMany({}, (err) => {
//             done();
//         });
//     });


describe('/GET NFT Details', () => {
    it("Should get NFT details", (done) => {
        chai.request('http://localhost:8000/nftdetails')
            .get('/')
            .end((err, res) => {
                // console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});


// describe('/GET/:saleType', () => {
//     it('it should GET a auction details by the given saleType', (done) => {
//         let nftdetails = {
//             nft__name: "Saloni",
//             nft__Description: "NFTDescription",
//             uri: "hello",
//             token_id: 2,
//             collection_address: "abcd23edfwew23ed",
//             nonce: 3,
//             seller_address: "abcd1234",
//             owner_address: "qweeert54321",
//             sale_amount: 200,
//             signature: "qwertyuik1234",
//             nft_address: "abcd23edfwew23ed",
//             payment_asset_address: "asdfgrt4321",
//             royalty: 20,
//             Imguri: "img",
//             saleType: "bidauction",
//             external_link: "http://abc.com",
//             supply: 5,
//             starting_amount: 300,
//             reserve_amount: 250,
//             decline_amount: 150
//         };
//         chai.request('http://localhost:8000/nftdetails')
//             .get('/' + nftdetails.saleType)
//             .end((err, res) => {
//                 console.log("Error", err);
//                 console.log("Response", res.body);
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });

describe("/POST NFT Details", () => {
    it("Should Post a NFT Details", (done) => {
        let nftdetails = {
            _name: "Saloni",
            Link: "http://abc.com",
            Description: "NFTDescription",
            Supply: 5,
            token_id: 2,
            BlockChain: "Ethereum",
            nonce: 1,
            seller_address: "abcd1234",
            owner_address: "qweeert54321",
            sale_amount: 200,
            signature: "qwertyuik1234",
            nft_address: "abcd23edfwew23ed",
            payment_asset_address: "asdfgrt4321",
            royalty: 20,
            Imguri: "img",
            saleType: "bidauction",
            starting_amount: 300,
            reserve_amount: 250,
            decline_amount: 150,
            price: 500
        };
        chai.request('http://localhost:8000/nftdetails')
            .post('/')
            .send(nftdetails)
            .end((err, res) => {
                //console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

// describe('/PUT/:id ', () => {
//     it('it should Update a NFT details by the given id', (done) => {
//         let nftdetails = {
//             nft__name: "Saloni",
//             nft__Description: "NFTDescription",
//             uri: "hello",
//             token_id: 2,
//             collection_address: "abcd23edfwew23ed",
//             nonce: 3,
//             seller_address: "abcd1234",
//             owner_address: "qweeert54321",
//             sale_amount: 150,
//             signature: "qwertyuik1234",
//             nft_address: "abcd23edfwew23ed",
//             payment_asset_address: "asdfgrt4321",
//             royalty: 20,
//             Imguri: "image",
//             saleType: "bid",
//             starting_amount: 300,
//             reserve_amount: 250,
//             decline_amount: 50
//         }
//         chai.request('http://localhost:8000/nftdetails')
//             .patch('/636ccc3c4e63b9565fb9b411')
//             .send(nftdetails)
//             .end((err, res) => {
//                 const id = res.body._id;
//                 console.log("Response", res.body);
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });

describe("/DELETE/:id", () => {
    it('it should Delete an NFT details by the given id', (done) => {
        chai.request('http://localhost:8000/nftdetails')
            .delete('/636ccc3c4e63b9565fb9b411')
            .end((err, res) => {
                console.log("Response", res.body);
                done();
            });
    });
});

//});