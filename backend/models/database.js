// Import the mongoose module
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/BackendData',{useNewUrlParser: true},(err)=>
{
    if(!err){console.log('Database Connected...')}
    else{
        console.log('Error'+err);
    }
});

