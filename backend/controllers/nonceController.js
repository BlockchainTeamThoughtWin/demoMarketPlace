const mongoose = require('mongoose');
const nonceSchema = require('../model/nonceSchema');
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
    // console.log("currentNonce",currentNonce);
    // console.log(req.params);
    try{
        let data = await nonceSchema.find();
        console.log(data,"data");
        if (data.length<1){
        data = nonceSchema.create({nonce : 0});
        console.log("data",data);
        }
        res.send(data);
    }catch (err) {
        res.json({ message: err })
        console.log('Error', err)

    }
}

const update_nonce = async function(req,res){

    let currentNonce = nonceSchema.findOne(req.currentNonce)
    res.nonce =req.body.updatedNonce
    res.save()
    
};



module.exports = {
    // set_nonce,
    get_nonce,
    update_nonce
}