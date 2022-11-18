let mongoose = require('mongoose');
let Verify = require('../model/UserVerificationSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

// describe('UserVerification', () => {
//     beforeEach((done) => {
//         Verify.deleteMany({}, (err) => {
//             done();
//         });
//     });

    describe('/GET UserVerification', () => {
        it("Should get the user details for verification", (done) => {
            chai.request('http://localhost:8000/UserVerification')
                .get('/')
                .end((err, res) => {
                    console.log("Error", err);
                    console.log("Response", res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST Details', () => {
        it("Should post user details for verification", (done) => {
            let userVerify = {
                user_address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                nonce: 1,
                signature: "0x52694d4f7a26efde573a8bf8b8062137bf93f8f4a8820090ed8ecb6a19b205a24157231e2a0604bfefa58f5d42a1fd309ebb3df8b0b746096ec02faae1d9d34b1b"
            }
            chai.request('http://localhost:8000/UserVerification')
                .post('/')
                .send(userVerify)
                .end((err, res) => {
                    console.log("Error", err);
                    console.log("Response", res.body);
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/PUT/:id', () => {
        it("Should Update user details for verification by the given id", (done) => {
            let userVerify = {
                user_address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                nonce: 3,
                signature: "0x52694d4f7a26efde573a8bf8b8062137bf93f8f4a8820090ed8ecb6a19b205a24157231e2a0604bfefa58f5d42a1fd309ebb3df8b0b746096ec02faae1d9d34b1b"
            }
            chai.request('http://localhost:8000/UserVerification')
                .patch('/6374945fa69678c29c496942')
                .send(userVerify)
                .end((err, res) => {
                    console.log("Response", res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("/DELETE/:id", () => {
        it('Should Delete an auction details by the given id', (done) => {
            chai.request('http://localhost:8000/UserVerification')
                .delete('/6374945fa69678c29c496942')
                .end((err, res) => {
                    console.log("Response", res.body);
                    done();
                });
        });
    });
//});