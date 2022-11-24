const mongoose = require("mongoose");

const nftDetailsSchema = new mongoose.Schema({
  _name: {
    type: String,
  },
  Link: {
    type: String,
  },
  Description: {
    type: String,
  },
  Supply: {
    type: Number,
    // unique: false,
  },
  token_id: {
    type: Number,
  },
  BlockChain: {
    type: String,
  },
  nonce: {
<<<<<<< HEAD
    type: Number,
    unique: true,
=======
    type:Number,
    // index:true,
    default:0,
>>>>>>> a058355790f6f9720670f169cc36e41c21d07f49
  },
  seller_address: {
    type: String,
  },
  owner_address: {
    type: String,
  },
  sale_amount: {
    type: Number,
  },
  signature: {
    type: String,
  },
  nft_address: {
    type: String,
  },
  payment_asset_address: {
    type: String,
  },
  royalty: {
    type: Number,
  },
  Imguri: {
    type: String,
  },
  saleType: {
    type: String,
  },
  start_time: {
    type: String,
    default: Date,
  },
  end_time: {
    type: String,
    default: Date,
  },
  starting_amount: {
    type: Number,
  },
  reserve_amount: {
    type: Number,
  },
  decline_amount: {
    type: Number,
  },
  price:{
    type: Number,
  }
});

const use = mongoose.model("NFTDtails", nftDetailsSchema);
module.exports = use;