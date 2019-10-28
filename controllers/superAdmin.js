const userModel                         =  require("../models/user");
const user                              =  require('./users');
const userTypes                         =  require('../config/userTypes');
const randomKeys                        =  require('../helpers/randomizer');
const status                            =   require('../config/status');
const mailHelper                        =   require('../helpers/mailer');
const urlJoiner                         =   require('url-join');

module.exports = class SuperAdmin{

    static create(req,res){
        let userDets = {

            first_name  : req.body.first_name,
            last_name   : req.body.last_name,
            email       : req.body.email,
            userType    : userTypes.admin,
            statusId    : status.unverified,
            password    : req.body.password

        };

        randomKeys(30).then((keys)=>{

            userDets.reset_key = keys;
            return  user.create(userDets);

        }).then((result)=>{

            let userResult  = result.toJSON();
            let url         = urlJoiner(process.env.APP_URL,'user/verify',userResult.email,userResult.resetKey );
            let mailer      = new mailHelper();

            mailer.sender('Knowledge App Verification')
                  .recipient(userDets.email)
                  .subject('Knowledge App Account Creation')
                  .template('account_verification.pug',{url,userEmail:userDets.email,password:req.body.password})
                  .send(4);

            res.withSuccess(201).reply();

        }).catch((error)=>{
            res.withServerError(500).withErrorData(error).reply();
            console.log(error);
        })

    }

    static getUsers(req,res){

        req.paginate();

        userModel.findAll(

            {
                where   : req.query.q,
                limit   : req.query.perPage
            }

        ).then((results)=>{
           res.withSuccess(200)
                .withData(results)
                .withPagination()
                .then((obj)=>{
                    obj.reply();
                })


        }).catch((e)=>{
            console.log(e);
            res.withServerError(500).withErrorData(e).reply();
        })


    }

    static updateUser(req,res){
        userModel.update({
            status:req.body.status
        },{
            where:{
                id:req.body.userId
            }
        }).then(()=>{
            res.withSuccess(200).reply();
        })
    }


    static uploadVideos(req,res){

    }

};