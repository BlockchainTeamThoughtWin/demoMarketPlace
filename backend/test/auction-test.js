let mongoose = require('mongoose');
let Auctions = require('../model/AuctionDetailsSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();


chai.use(chaiHttp);

// describe('Auction', () => {
//     beforeEach((done) => {
//         Auctions.deleteMany({}, (err) => {
//             done();
//         });
//     });


describe('/GET Auction', () => {
    it("Should get auction details", (done) => {
        chai.request('http://localhost:8000/auctiondetails')
            .get('/')
            .end((err, res) => {
                // console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                // res.body.should.have.property(':_id');
                done();
            });
    });
});

describe('/GET/:id', () => {
    it('Should GET a auction details by the given id', (done) => {
        let auctionDetails = new Auctions({
            starting_amount: 300,
            reserve_amount: 250,
            decline_amount: 150,
            uri: "hello",
            to_address: "unknown",
            royalty: 120,
            nonce: 1
        });
        auctionDetails.save((err, auctionDetails) => {
            chai.request('http://localhost:8000/auctionDetails')
                .get('/' + auctionDetails.id)
                //.send(auctionDetails)
                .end((err, res) => {
                    // console.log("Error", err);
                    console.log("Response", res.body);
                    // const id = res.body._id;
                    // console.log("Id", id);
                    res.should.have.status(200);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('starting_amount');
                    res.body.should.have.property('reserve_amount');
                    res.body.should.have.property('decline_amount');
                    res.body.should.have.property('uri');
                    res.body.should.have.property('to_address');
                    res.body.should.have.property('royalty');
                    res.body.should.have.property('nonce');
                    res.body._id.should.equal(auctionDetails.id);
                    res.body.should.have.property('_id').eql(auctionDetails.id);
                    done();
                });
        });
    });
});

describe("/POST Auction", () => {
    it("Should Post an auction", (done) => {
        let auctionDetails = {
            starting_amount: 300,
            reserve_amount: 250,
            decline_amount: 150,
            uri: "hello",
            to_address: "unknown",
            royalty: 120,
            nonce: 1
        }
        chai.request('http://localhost:8000/auctiondetails')
            .post('/')
            .send(auctionDetails)
            .end((err, res) => {
                // console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.should.have.property('starting_amount');
                // res.body.should.have.property('reserve_amount');
                // res.body.should.have.property('decline_amount');
                // res.body.should.have.property('uri');
                // res.body.should.have.property('to_address');
                // res.body.should.have.property('royalty');
                // res.body.should.have.property('nonce');
                done();
            });
    });
});

describe('/PUT/:id ', () => {
    it('Should Update an auction details by the given id', (done) => {
        let auctionDetails = {
            starting_amount: 300,
            reserve_amount: 200,
            decline_amount: 50,
            uri: "heyy",
            to_address: "unknownAddress",
            royalty: 120,
            nonce: 1
        };
        chai.request('http://localhost:8000/auctionDetails')
            .patch('/636c9b30d983ead68c30fd95')
            .send(auctionDetails)
            .end((err, res) => {
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});

describe("/DELETE/:id", () => {
    it('Should Delete an auction details by the given id', (done) => {
        chai.request('http://localhost:8000/auctionDetails')
            .delete('/636caa2c5229c63ea9fc359f')
            .end((err, res) => {
                console.log("Response", res.body);
                done();
            });
    });
});

//});

