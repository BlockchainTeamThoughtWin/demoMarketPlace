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
    // const  currentNonce = req.body.nonce
    // console.log("currentNonce",currentNonce);
    // console.log(req.params);
    // try{
        let data = await nonceSchema.find();
        console.log(data,"data");
    //     if (data.length<1){
    //         data = await nonceSchema.create({nonce : 0});
    //         console.log("data",data);
    //     }
    //     res.send(data);
    // }catch (err) {
    //     res.json({ message: err })
    //     console.log('Error', err)

    // }
    res.json(data);
}

const update_nonce = async function(req,res){

    // let nonceData = nonceSchema.findOne(req.currentNonce);
    // nonceData.nonce =req.body.updatedNonce;
    // nonceData.save();
    let data = await nonceSchema.find();
    let abc;
    if (data.length<1){
                data = await nonceSchema.create({nonce : 0});
                console.log("data",data);
            }
            else{
             abc    = await nonceSchema.updateMany(
        
                    {
                        $set:req.body
                    }
                );
            }
    
    res.send(abc);
};



module.exports = {
    // set_nonce,
    get_nonce,
    update_nonce
}