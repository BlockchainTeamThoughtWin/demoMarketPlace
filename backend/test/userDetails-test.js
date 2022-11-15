let mongoose = require('mongoose');
let Details = require('../model/UserDetailsSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

// describe('UserDetails', () => {
//     beforeEach((done) => {
//         Details.deleteMany({}, (err) => {
//             done();
//         });
//     });
// });

describe('/GET Details', () => {
    it("Should get user details", (done) => {
        chai.request('http://localhost:8000/userdetails')
            .get('/')
            .end((err, res) => {
                console.log("Error", err);
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});

describe('/GET/:id', () => {
    it("Should get a user details", (done) => {
        let userDetails = new Details({
            user_name: "Saloni",
            user_address: "abcde12345",
            collection_details: 12345
        });
        userDetails.save((err, userDetails) => {
            chai.request('http://localhost:8000/userdetails')
                .get('/', userDetails.id)
                .end((err, res) => {
                    console.log("Error", err);
                    console.log("Response", res.body);
                    done();
                });
        });
    });
})

describe('/POST Details', () => {
    it("Should post user details", (done) => {
        let userDetails = {
            user_name: "Saloni",
            user_address: "abcde12345",
            collection_details: 12345
        }
        chai.request('http://localhost:8000/userdetails')
            .post('/')
            .send(userDetails)
            .end((err, res) => {
                console.log("Response", res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/PUT/:id', () => {
    it("Should update user details by the given id", (done) => {
        let userDetails = {
            user_name: "Saloni",
            user_address: "abcde1234567",
            collection_details: 1234567
        }
        chai.request('http://localhost:8000/userdetails')
            .patch('/6372281dffea5ce52b491a12')
            .send(userDetails)
            .end((err, res) => {
                console.log("Response", res.body);
                res.should.have.status(200);
                done();
            });
    });
});

describe("/DELETE/:id", () => {
    it('Should Delete a user history by the given id', (done) => {
        chai.request('http://localhost:8000/userdetails')
            .delete('/6372299a651afbf408f5d07a')
            .end((err, res) => {
                console.log("Response", res.body);
                done();
            });
    });
});








