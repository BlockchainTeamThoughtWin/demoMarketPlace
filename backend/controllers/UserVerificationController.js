const mongoose = require('mongoose');
const Web3 =require("web3");

// console.log(":::::",web3,"2eeee");
const userVerificationSchema = require('../model/UserVerificationSchema');
require('express');

exports.create_user_verification = async function(req,resp){
    var web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
    const data = new userVerificationSchema(req.body);
    console.log("data related to signature>>>> ",data);

    const signer = await web3.eth.accounts.recover(data.hash, data.signature);
    console.log("<<<<<<",signer);

    const result = await data.save();
    resp.send(result);
};

exports.get_user_verification = async function(req,resp){
    const data = await userVerificationSchema.find();
    resp.send(data);
};

exports.delete_user_verification = async function(req,resp){
    const data = await userVerificationSchema.deleteOne(req.params);
    resp.send(data);
};

exports.update_user_verification = async function(req,resp){
    console.log(req.params);
    const data = await userVerificationSchema.updateMany(req.params,
        {
            $set:req.body
        }
    );
    resp.send(data);
}

