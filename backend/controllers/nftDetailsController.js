
const mongoose = require('mongoose');
const nftDetailsSchema = require('../model/nftDetailsSchema');
const nonceSchema = require('../model/nonceSchema');
const update_nonce1 = require('./nonceController');

// console.log(update_nonce1.update_nonce);
require('express');

const get_nft_details = async function(req,res){
    try{
        const data = await nftDetailsSchema.find();
        console.log("dddd",data);
        res.json(data);
    } catch (err) {
        res.json({ message: err })
    }
}
    
const create_nft_details = async function(req,res){
    try{
        // console.log(res);
        let CurrentNonceFromUI = req.body.currentNonce
        let UpdatedNonceFromUI = req.body.nonce
        console.log(req.body);
        console.log("CurrentNonceFromUI is >>>>>",CurrentNonceFromUI);
        console.log("UpdatedNonceFromUI is >>>>>",UpdatedNonceFromUI);
        let data1 = await nftDetailsSchema.findOne({nonce : UpdatedNonceFromUI});
        console.log("Data1 is",data1);
        // await nftDetailsSchema.remove();
        // if (!data1){
        //     const data = new nftDetailsSchema(req.body);
        //     console.log("Creating New Entry with token ID: ",data.token_id);
        //     const result = await data.save();
        //     console.log("result<<<<<<<<",result);
        //     res.send(result);
        //     console.log("<<<<");
        // }
        console.log("UpdatedNonceFromUI", UpdatedNonceFromUI)
        if (!data1){
            console.log("inside if");
            // const data = new nftDetailsSchema(req.body);
            // console.log("Creating New Entry with token ID: ",data.token_id);
            //
            const result = await nftDetailsSchema.create(req.body);
            console.log("result<<<<<<<<",result);
            res.send(result);
        }
        else{
            console.log("Inside else if");
            const data = await nftDetailsSchema.updateMany(
                {nonce:UpdatedNonceFromUI},
                {
                    $set: req.body
                }
            );
            console.log("Update from existing data.",data);
            
            // console.log("s data to send",s);
            res.send(data);
            // console.log("updated once to send in  backend",s);
        }
        const s = await update_nonce1.update_nonce(req.body);
        console.log("Outside else");
    } catch (err) {
        res.json({ message: 'error', err })
        console.log('Error', err)
    }
};
// const delete_nft_details = async function(req,res){
//     const data = await nftDetailsSchema.deleteOne(req.params);
//     res.send(data);
// };
// const update_nft_details = async function(req,res){
//     console.log(req.params);
//     const data = await nftDetailsSchema.updateOne(
//         req.params,
//         {
//             $set:req.body
//         }
//     );
//     res.send(data);
// };
module.exports = {
    create_nft_details,
    get_nft_details,
    // delete_nft_details,
    // update_nft_details
}