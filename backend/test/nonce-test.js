let mongoose = require("mongoose");
let Nonces = require('../models/nonceSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
// let mocha = require('mocha');
let server = require('../server.js');
let should = chai.should();
let currentNonce;

chai.use(chaiHttp);
//Our parent block
describe('Nonce', () => {
  beforeEach((done) => {
    Nonces.remove({}, (err) => {
      done();
    });
  });

  /*
    * Test the /GET route
    */
  describe('/GET nonce', () => {
    it("Should GET all nonces", (done) => {
      chai.request('http://localhost:4000')
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          console.log("CurrentNonce", Nonces.currentNonce);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('Set nonce', () => {
    it('it should POST a nonce ', (done) => {
      let unique_nonce = {
        type: 1,
        index: true,
        default: 0
      }
      chai.request('http://localhost:4000')
        .post('/')
        .send(unique_nonce)
        .end((err, res) => {
          res.should.have.status(200);
        //  res.body.should.be.a('object');
        //res.status.should.equal(404);
       // res.body.error.should.equal(false);
          // res.body.should.have.property('message').eql('Book successfully added!');
          // res.body.book.should.have.property('title');
          // res.body.book.should.have.property('author');
          // res.body.book.should.have.property('pages');
          // res.body.book.should.have.property('year');
          done();
        });
    });
  });

});
