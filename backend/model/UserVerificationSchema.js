const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({

    user_address:{
        type: String,
    },
    nonce:{
        type: Number,
    },
    signature:{
        type: String,
    }

});
const use = mongoose.model("userVerification",userVerificationSchema);

module.exports = use;