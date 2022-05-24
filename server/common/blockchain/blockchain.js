const express  = require('express');
const router   = express.Router();
// const UserDetailsModel = require("../../../models/userDetailsModel");
const UserDetailsModel = require("../../models/userDetailsModel");
const TransactionModel = require("../../models/transactionModels");
const {validateApiSecret,isAuthenticated, isAuthenticatedHederaUser} = require('../../middleware/userAuth');
const client = require("./clientHelper");
const token = require("./tokenServicesHelper");
const { body, validationResult } = require("express-validator");
// const logger = require("./../../../../logger");
const { AccountInfo } = require('@hashgraph/sdk');


router.post("/mintToken",[
    body('tokenAmount').not().isEmpty(),
    ],
    // isAuthenticated,
    // validateApiSecret,
async (req,res)=>{
    try{
        // if(req.decoded.username == process.env.admin_username){
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(200).json({
            //     error: errors.array()[0],
            //     result:false
            //     });
            // }
            const amountToMint = parseInt(req.body.tokenAmount);
            console.log('Amt: ', amountToMint);
            const result =  await token.tokenMint({
                amount:amountToMint,
                tokenId:process.env.TOKEN_ID,
                supplyKey:process.env.MY_PRIVATE_KEY,
                });
            if(!result.status){
                return res.status(200).json({
                    msg:"Token Minting Failed",
                    result:false,
                    error:result.error
                });
            }
            // let ad = await UserDetailsModel.findOne({type: 'admin'});       //find database admin and update
            // ad.token += amountToMint;
            // ad.save();
            return res.status(200).json({
                msg:result.message,
                data:result.transactionId,
                result:true
            });
        // } else {
        //     return res.status(200).json({
        //         msg: 'Unauthorized for this Action',
        //         result: false
        //     });
        // }

    }catch(e){
        return res.status(200).json({
            msg:"Token Minting Failed",
            result:false,
            error:e.message
        })
    }
})



module.exports = router;