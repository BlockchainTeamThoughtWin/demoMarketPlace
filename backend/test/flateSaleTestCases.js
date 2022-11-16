const expect = require('chai').expect;
let mongoose = require("mongoose");
const flateSaleSchema = require('../model/FlateSale.Schema');
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('FlateSale!', () => {
    // beforeEach((done) => {
    //     flateSaleSchema.deleteMany({}, (err) => { 
    //        done();           
    //     }); 
    });
/*
* Testing the /GET Route.
*/
    describe('GET /flatesale', () => {
      it('should GET all the bidding details', (done) => {
        chai.request('http://localhost:1000/flatesale')
            .get('/')
            .end((err, res) => {
              // console.log("res><<<<<<<<<<<<", res.body);
              res.should.have.status(200);
              done();
            });
      });
  });
  
  /*
  * Test the /POST route
  */
  describe('POST /flatesale', () => {
      it('it should POST a bid ', (done) => {
          let flatesaleDetails = {
                token_id: 1,
                nft_address: "wqe3243",
                seller_address:"3rr543454",
                collection_address:"353346gtrrf",
                sale_amount:23,
                payment_asset_address:"rf4wqr45t25r",
                nonce:"0",
                uri:"edfre4342",
                nft__name:"erf",
                nft__Description:"rregrtg",
                royalty: 3,
                Imguri: "err3e",
                signature: "derferfdw",
                saleType: "rf"
        }
        chai.request('http://localhost:1000/flatesale')
            .post('/')
            .send(flatesaleDetails)
            .end((err, res) => {
            res.should.have.status(200);
            done();
            });
      });
  });

  /*
   * Test PATCH Route.
  */
  describe('PATCH /flatesale', () => {
  it('patch user succesfull', (done) => {
      let flatesaleDetails = {
          token_id: 4,
          nft_address: "43",
          seller_address:"43454",
          collection_address:"46gtrrf",
          sale_amount:23,
          payment_asset_address:"rf4wq5r",
          nonce:"0",
          uri:"edf42",
          nft__name:"erf",
          nft__Description:"rregrtg",
          royalty: 1,
          Imguri: "err3e",
          signature: "derferfdw",
          saleType: "rf"
      }
    chai.request('http://localhost:1000/flatesale/')
    .patch('/636ca0b34cd0f6463151d7a7')
    .send(flatesaleDetails)
    .end((err, res) => {
    //   res.body.royalty.should.be.eql(2.5);
      // console.log(res.body,"ssss");
     done();
    });
     });
    });


  /* 
  *Test the PUT route
  */

//   describe('PUT /bidderDetails/id', () => {
//     it('Should  PUT or Update ', (done) => {
//               let biddingDetails = new bidderDetailSchema({
//                 starting_amount:11,
//                 reserve_amount: 11,
//                 decline_amount: 11
//             })
//             biddingDetails.save((err,biddingDetails) => {
//               chai.request('http://localhost:1000/bidderdetails/')
//               .put('/' +biddingDetails.id)
//               .send(biddingDetails)
//               .end((err, res) => {
//                 console.log("err",err);
//                 console.log("res<<<<<>>", res.body ,">>>>>>>>>>>>>");
//                     // res.body.should.be.a('object');
//                     // res.bodyhould.have.proper.should.have.property('starting_amount');
//                     // res.body.sty('reserve_amount');
//                     // res.body.should.have.property('decline_amount');
//                     // res.body.should.have.property('uri');
//                     // res.body.should.have.property('to_address');
//                     // res.body.should.have.property('royalty');
//                     // res.body.should.have.property('nonce');

//                     // res.body.should.have.property('message').eql('updated!');
//                 done();
//               });

//             })    
//             });

     
//   });

  /*
  * Test the DELETE route
  */

  describe('DELETE /flatesale/id', () => {

    it('delete user succesfull', (done)=> {
    chai.request('http://localhost:1000/flatesale')
    .delete('/636ca0b34cd0f6463151d7a7')
    .end(function(err, res) {
      // console.log(res.body,"Delete should be done");
      done()
    });
    });

  })

// });
