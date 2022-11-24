const mongoose = require('mongoose');
const nonceSchema = require('../model/nonceSchema');
const updatedNonce = require('./nftDetailsController')
require('express');

// const set_nonce = async function (req, res) {
//     let createNonce = 0;
//     const result = await nonceSchema.create({nonce : createNonce})
//     console.log("result <<<<",result);
//     // const result = await data.save();
//     res.send(result);

// };

const get_nonce = async function(req,res){
    const  currentNonce = req.body.nonce
    console.log("currentNonce",currentNonce);  
    // console.log(req.params);
    try{
        let data = await nonceSchema.find();
        console.log(data,"data");
        
        if (data.length<1){
            data = await nonceSchema.create({nonce : 0});
            console.log("data",data);
        }
        res.send(data);
    }catch (err) {
        res.json({ message: err })
        console.log('Error', err)

    }
}


const update_nonce = async function(req){
    console.log(req.nonce,"Nonce data getting to update in nonce schema.");
    const nonceData = await nonceSchema.updateOne({
        $set: req
    });
    console.log("nonce schema data is to be update ",nonceData,"<<<<<<<<<<<");
    // nonceData.nonce = updatedNonce;

    // nonceData = req.nonce;
    // nonceData.save();
    
};




module.exports = {
    // set_nonce,
    get_nonce,
    get_by_nonce,
    update_nonce
}