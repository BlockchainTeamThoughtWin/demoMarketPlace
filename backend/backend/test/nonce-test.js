let mongoose = require("mongoose");
let Nonces = require('../model/nonceSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
// describe('Nonce', () => {
//   beforeEach((done) => {
//     Nonces.deleteMany({}, (err) => {
//       done();
//     });
//   });

/*
  * Test the /GET route
  */
describe('/GET nonce', () => {
  it("Should GET all nonces", (done) => {
    chai.request('http://localhost:8000/nonce')
      .get('/')
      .end((err, res) => {
        console.log("Error", err);
        console.log("Response", res.body);
        res.should.have.status(200);
        done();
      });
  });
});

/*
  * Test the /GET route by nonce
  */

describe('/GET nonce/:nonce', () => {
  it("Should GET all nonces", (done) => {
    let get_nonce = new Nonces({
      nonce: 1
    });
    get_nonce.save((err, get_nonce) => {
      chai.request('http://localhost:8000/nonce')
        .get('/', get_nonce.nonce)
        .end((err, res) => {
          console.log("Error", err);
          console.log("Response", res.body);
          done();
        });
    });
  });
});


/*
* Test the /POST route
*/
describe('/POST nonce', () => {
  it("Should post nonce", (done) => {
    let get_nonce = {
      nonce: 1
    }
    chai.request('http://localhost:8000/nonce')
      .post('/')
      .send(get_nonce)
      .end((err, res) => {
        console.log("Response", res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/Put/:nonce', () => {
  it("Should update nonce ny given nonce", (done) => {
    let get_nonce = {
      nonce: 1
    }
    chai.request('http://localhost:8000/nonce')
      .patch('/1')
      .send(get_nonce)
      .end((err, res) => {
        console.log("Response", res.body);
        res.should.have.status(200);
        done();
      });
  });
});
// });


