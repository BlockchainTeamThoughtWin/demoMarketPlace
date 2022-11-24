const mongoose = require('mongoose');

const nonceSchema = new mongoose.Schema({
<<<<<<< HEAD
    nonce: {
        type: Number,
        index: true,
        default: 0,
=======
    nonce:{
        type:Number,
        // index:true,
        default:0,
>>>>>>> a058355790f6f9720670f169cc36e41c21d07f49
    }
});
const use = mongoose.model('nonceSchema', nonceSchema);

module.exports = use;