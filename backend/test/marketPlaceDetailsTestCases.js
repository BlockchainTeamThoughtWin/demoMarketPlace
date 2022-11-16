const expect = require('chai').expect;
let mongoose = require("mongoose");
const marketPlaceSchema = require('../model/marketplaceDetailsSchema');
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('MarketPlaceDetails!', () => {
    // beforeEach((done) => {
    //     flateSaleSchema.deleteMany({}, (err) => { 
    //        done();           
    //     }); 
    });
/*
* Testing the /GET Route.
*/
    describe('GET /Marketplace', () => {
      it('should GET all the bidding details', (done) => {
        chai.request('http://localhost:1000/Marketplace')
            .get('/')
            .end((err, res) => {
            //   console.log("res><<<<<<<<<<<<", res.body);
              res.should.have.status(200);
              done();
            });
      });
  });
  
  /*
  * Test the /POST route
  */
  describe('POST /MarketplaceDetails', () => {
      it('it should POST a bid ', (done) => {
          let marketplaceDetails = {
            starting_amount:"011",
            reserve_amount:"0111",
            decline_amount:"2222222332",
            uri: "#DWE",
            to_address:"3r4",
            royalty:"3.4",
            nonce:"0",
            token_id:"0",
            nft_address:"4hrbefwjhfrwjkfhrfgehjkfkljrnhwefhjlehifirelkjijfikrjer",
            seller_address:"ewr",
            collection_address:"eder",
            sale_amount:"344",
            payment_asset_address:"3rf",
            nft_name: "wr",
            nft_Description: "jefrf"
        }
        chai.request('http://localhost:1000/Marketplace')
            .post('/')
            .send(marketplaceDetails)
            .end((err, res) => {

            res.should.have.status(200);
            done();
            });
      });
  });

  /*
   * Test PATCH Route.
  */
  describe('PATCH /MarketplaceDetails', () => {
  it('patch user succesfull', (done) => {
    let marketplaceDetails = {
        starting_amount:"000",
        reserve_amount:"000",
        decline_amount:"332",
        uri: "#oDWE",
        to_address:"3r4",
        royalty:"3.4",
        nonce:"0",
        token_id:"0",
        nft_address:"kljrnhwefhjlehifirelkjijfikrjer",
        seller_address:"ewr",
        collection_address:"eder",
        sale_amount:"344",
        payment_asset_address:"3rf",
        nft_name: "wr",
        nft_Description: "jefrf"
    }
    chai.request('http://localhost:1000/Marketplace')
    .patch('/636ca872880c1605304a9795')
    .send(marketplaceDetails)
    .end((err, res) => {
    //   res.body.royalty.should.be.eql(2.5);
    //   console.log(res.body,"market");
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

  describe('DELETE /MarketplaceDetails/id', () => {

    it('delete user succesfull', (done)=> {
    chai.request('http://localhost:1000/Marketplace')
    .delete('/636ca872880c1605304a9795')
    .end(function(err, res) {
    //   console.log(res.body,"Delete should be done");
      done()
    });
    });

//   })

});
