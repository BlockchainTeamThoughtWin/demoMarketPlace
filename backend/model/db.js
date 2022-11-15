const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demoMarketPlace',{useNewUrlParser:true},(err)=>
{
    if(!err){console.log('Database Connected')}
    else{

        console.log('Error'+err);
    }
});

//const data = require('./AuctionDetailsSchema.js');