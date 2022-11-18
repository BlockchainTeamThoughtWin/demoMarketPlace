const mongoose = require('mongoose');
const Web3 =require("web3");
// var web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
require('express');

// let message = "Hello world";
// let userAdderess = "0x378367eb35a793817aD92ae055394E4A6CF1A0FF";
// let signature = "0xc92ac92baab9fc0e31f6ae89a1170447f162caf88e9f7866f4a212981fc52df8199e0d51220aa1c93128f86b9b975f4d28f57b83978b9015662ff87ba082bcd01c";

const userVerificationSchema = require('../model/UserVerificationSchema');
// console.log(userVerificationSchema,"Daata base");

exports.create_user_verification = async function(req,resp){ 
    const data = new userVerificationSchema(req.body);
    console.log("data related to signature>>>> ",data);
    const signer = await web3.eth.accounts.recover(req.body.nonce,req.body.signature);
    console.log(signer,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    if(signer == req.body.user_address){
        console.log("Verified user");
    }
    else{
        console.log("Beep beep robot");
    }

    // const signer = await web3.eth.accounts.recover(data.hash, data.signature);
    // console.log("<<<<<<",signer);
    const result = await data.save();
    // console.log("QER",result);
    resp.send(result);
    // let result1 = data.hash;
    // console.log("eeeeee",result1);
};

exports.get_user_verification = async function(req,resp){

    const data = await userVerificationSchema.find();
    // console.log(data,"data<><><><><>");
    // const signer = await web3.eth.accounts.recover(req.body.nonce,req.body.signature);
    // console.log(signer,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    // let data1 ;
    // if (signer == req.body.user_address){
    //     data1  = "verified user"
    //     console.log(data1);
    // }
    // else{
    //     data1 = "Beep Beep you are not authenticate user."
    //     console.log(data1);
    // }

    // const result = data.map(x => x.hash);
   
    // console.log("result",typeof(req.body.user_address), "dsisnd",typeof(signer));

    // console.log("SDafdaa",hash);
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

