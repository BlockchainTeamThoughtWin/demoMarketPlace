const expect = require('chai').expect;
let mongoose = require("mongoose");
const bidderDetailSchema = require('../model/BidderDetailSchema');
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('bidderDetailSchema!!', () => {
    beforeEach((done) => {
      bidderDetailSchema.deleteMany({}, (err) => { 
           done();           
        }); 
    });
/*]
* Testing the /GET Route.
*/
    describe('GET /bidderdetails', () => {
      it('should GET all the bidding details', (done) => {
        chai.request('http://localhost:1000/bidderdetails')
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
  describe('POST /bidderdetails', () => {
      it('it should POST a bid ', (done) => {
          let biddingDetails = {
            starting_amount: 9999,
            reserve_amount: 9,
            decline_amount: 9,
            uri: "111d54",
            to_address: "abcd23e23ed",
            royalty: 2.5,
            nonce: 00005
        }
        chai.request('http://localhost:1000/bidderdetails')
            .post('/')
            .send(biddingDetails)
            .end((err, res) => {
            res.should.have.status(200);
              done();
            });
      });
  });

  /*
   * Test PATCH Route.
  */
  describe('PATCH /bidderdetails', () => {
  it('patch user succesfull', (done) => {
      let biddingDetails = {
        starting_amount: 12,
        reserve_amount: 1,
        decline_amount: 1,
        uri: "111d54",
        to_address: "abcd23e23ed",
        royalty: 2.5,
        nonce: 00005
      }
    chai.request('http://localhost:1000/bidderdetails/')
    .patch('/636b8a02fc06ede5396dfce3')
    .send(biddingDetails)
    .end((err, res) => {
      // res.body.royalty.should.be.eql(2.5);
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

  describe('DELETE /bidderDetails/id', () => {

    it('delete user succesfull', (done)=> {
    chai.request('http://localhost:1000/bidderdetails')
    .delete('/636b8a02fc06ede5396dfce3')
    .end(function(err, res) {
      // console.log(res.body,"Delete should be done");
      done()
    });
    });

  })

});
