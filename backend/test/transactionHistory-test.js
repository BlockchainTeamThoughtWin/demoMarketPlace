let mongoose = require('mongoose');
let History = require('../model/transactionHiistorySchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

// describe('Transaction History', () => {
//     beforeEach((done) => {
//         History.deleteMany({}, (err) => {
//             done();
//         });
//     });
//});


describe('/GET history', () => {
    it("Should get the transaction history", (done) => {
        chai.request('http://localhost:8000/transactionhistory')
            .get('/')
            .end((err, res) => {
                //console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});

describe('/GET/:id', () => {
    it('Should GET a transaction history by the given id', (done) => {
        let transHistory = new History({
            from: "abcd12345",
            to: "qwertyy123456",
            price: 500
        });
        transHistory.save((err, transHistory) => {
            chai.request('http://localhost:8000/transactionhistory')
                .get('/' + transHistory.id)
                .end((err, res) => {
                    //console.log("Error", err);
                    console.log("Response", res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe("/POST Transaction History", () => {
    it("Should Post history", (done) => {
        let transHistory = {
            from: "abcd12",
            to: "qwerty012",
            price: 500
        };
        chai.request('http://localhost:8000/transactionhistory')
            .post('/')
            .send(transHistory)
            .end((err, res) => {
                console.log("Response", res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/PUT/:id ', () => {
    it('Should Update a transaction history by the given id', (done) => {
        let transHistory = {
            from: "abcd123",
            to: "qwerty0123",
            price: 500
        }
        chai.request('http://localhost:8000/transactionhistory')
            .put('/636d3786a09db06725f11d6a')
            .send(transHistory)
            .end((err, res) => {
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});

describe("/DELETE/:id", () => {
    it('Should Delete a transaction history by the given id', (done) => {
        chai.request('http://localhost:8000/transactionhistory')
            .delete('/636d3786a09db06725f11d6a')
            .end((err, res) => {
                console.log("Response", res.body);
                done();
            });
    });
});

//});

