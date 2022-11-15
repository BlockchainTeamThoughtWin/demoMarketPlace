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
// });

describe('/GET UserVerification', () => {
    it("Should get the user details for verification", () => {
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
            user_address: "address12345",
            nonce: 1,
            signature: "abcde12345"
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