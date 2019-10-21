const jwt                              = require('jsonwebtoken');
const userModel                        = require("../models/user");
const randomKey                        = require('../helpers/randomizer');
const passwordHelper                   = require('../helpers/passwordHelper');
const error                            = require('../config/errorMessages');
const fs                               = require('fs');
module.exports = class Users{

    static create(userDetails){

    let hashedPassword;
    let validationKey;
    let UserDet;
    //Validator

    return      randomKey(15).then((key)=>{
                    userDetails.resetKey        =   key;
                    userDetails.password        =   passwordHelper.hash(userDetails.password);
                }).then(()=>{
                    console.log(userDetails)
                    return  userModel.create(userDetails,{validate:false});
                })
    }

   static login(req,res){

       let userDet;

       userModel.findOne({
            where:{email:req.body.email}
        }).then((userResult)=>{
            userDet = userResult.toJSON();
            if(userResult){
                return passwordHelper.isSame(req.body.password,userDet.password)
            }else{
                return res.withClientError(404).withErrorData(error.acctNotExisting).repy();
            }
        }).then((passwordIsSame)=>{
            //if the passwords matches
            if (passwordIsSame){
                let payLoad = {
                    userId:userDet.id,
                    userType:userDet.userType
                };
                //Implement JWT
                var privateKey = fs.readFileSync('jwt_pk.key','utf8');

                jwt.sign(payLoad,privateKey, { expiresIn: '2h',algorithm: 'RS256' },function (err,code) {
                    if (err){
                        return res.withServerError(500).reply();
                    }else{
                        return res.withSuccess(200).withData({token:code}).reply();
                    }
                })
            }
        }).catch((error)=>{
            console.log(error);
            res.withServerError(500).reply();
       })
   }


}