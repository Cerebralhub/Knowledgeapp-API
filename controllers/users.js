const jwt                              = require('jsonwebtoken');
const userModel                        = require("../models/user");
const randomKey                        = require('../helpers/randomizer');
const passwordHelper                   = require('../helpers/passwordHelper');
const error                            = require('../config/errorMessages');
const fs                               = require('fs');
const statuses                         = require('../config/status');
const urlJoiner                        = require('url-join');
const mailHelper                       = require('../helpers/mailer');

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
                    return  userModel.create(userDetails,{validate:true});
                })
    }

   static login(req,res){

       let userDet;

       userModel.findOne({
            where:{email:req.body.email}
        }).then((userResult)=>{
            if(userResult){
                userDet = userResult.toJSON();
                return passwordHelper.isSame(req.body.password,userDet.password)
            }else{
                return res.withClientError(404).withErrorData(error.acctNotExisting).reply();
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
            }else{
                return res.withClientError(404).withErrorData(error.acctNotExisting).reply();
            }
        }).catch((error)=>{
            console.log(error);
            res.withServerError(500).reply();
       })
   }

   static accountExist(email){
        let verifyEmail = email||req.body.email
       userModel.findOne({
           where:{email:verifyEmail}
       }).then((result)=>{
           if (result){
               return true;
           }else{
               false;
           }
       })
   }

   static verify(req,res){
       userModel.update(
           {
                 status             :   statuses.active,
                 resetKey           :   null,
                 emailVerifiedAt    :   Date.now()
           },
           {

                where:{
                        email   :req.params.email,
                        resetKey: req.params.token
                     },
                returning:true
            }
       ).then((user)=>{
          if (user){
              res.withSuccess(200).reply();
          }else{
              res.withClientError(404).reply();
          }
       }).catch((error)=>{
           res.withServerError(500).withErrorData(error).reply();
       })
   }

   static passwordResetInit(req,res){

        let resetKey;

       let payLoad = {
           email:req.body.email
       };

       //Implement JWT
       var privateKey = fs.readFileSync('jwt_pk.key','utf8');

       jwt.sign(payLoad,privateKey, { expiresIn: '1h',algorithm: 'RS256' },function (err,resetKey) {

           if (!err){
               userModel.update(
                   {
                       resetKey
                   },
                   {

                       where:{
                           email   :req.body.email,
                       },
                       returning:true
                   }
               ).then((user)=>{
                   if (user){

                       let url =   urlJoiner(process.env.APP_URL,'password/reset',resetKey );

                       let mailer = new mailHelper();

                       mailer.sender('Knowledge App ')
                           .recipient(req.body.email)
                           .subject('Knowledge App Password Reset')
                           .template('password_reset.pug',{url,email:req.body.email})
                           .send(4);

                       res.withSuccess(200).reply();

                   }else{
                       res.withClientError(404).reply();
                   }
               }).catch((error)=>{
                   console.log(error);
                   return res.withServerError(500).withErrorData(error).reply();
               })
           }else{
               return res.withServerError(500).reply();
           }
       })

   }
    static passwordReset(req,res){

        let token     = req.params.token;

        let cert      = fs.readFileSync('jwt_pubk.key','utf8');  // get public key

        jwt.verify(token, cert, { algorithms: ['RS256'] }, function(err, payload) {

            if (err){
                res.withClientError(403).withErrorData(err).reply();
            }else{

                userModel.update(
                    {
                        password:req.body.password,
                        resetKey:null
                    },
                    {
                        where:{
                            email   :   payload.email,
                            resetKey:   token
                        },
                    }
                ).then((result)=>{
                    //Was anything updated?
                    if (result[0] > 0){
                        //If the reset was done
                        return res.withSuccess(200).reply();
                    }else{
                        //There was no update
                        return res.withClientError(404).reply();
                    }
                }).catch(()=>{
                    //There was an issue on updating the db
                    return res.withServerError(500).reply();
                })


            }

        });
    }
}