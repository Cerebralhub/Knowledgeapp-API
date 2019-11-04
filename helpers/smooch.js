'use strict'
const jwt                              = require('jsonwebtoken');
const fs                               = require('fs');
const jwtVerifier                      = require('../helpers/jwtVerifier');
const {Op}                             = require('sequelize');




let smooch = function (options) {
  let smoochOptions = options||{};

  return function (req,res,next) {
    let message ={};
    //just a hack
    !req.query.q?req.query.q=null:"";

    let smoochObj = {
      withClientError:function (errorCode) {

        switch (errorCode) {
          case 400:
            message.error = {
              code:400,
              message:"The server could not understand the request due to invalid syntax."
            };
            break;
          case 401:
            message.error = {
              code:401,
              message:"Permission Denied. You must log in"
            };
            break;
          case 403:
            message.error = {
              code:403,
              message:"Access Denied. You do not have adequate right."
            };
            break;
          case 404:
            message.error = {
              code:404,
              message:"Resource not found"
            };
            break;
        }
        return this;
      },

      withServerError:function (errorCode) {
        switch (errorCode) {
          case 500:
            message.error = {
              code:500,
              message:"The server has encountered a situation it doesn't know how to handle."
            };
            break;
        }
        return this;
      },

      withSuccess:function (code,type) {
        switch (code) {
          case 200:
            message.success = {
              code:200,
              message:"The request has succeeded"
            };
           break;
          case 201:
            message.success = {
              code:201,
              message:`Resource ${type?type:'operation'} is successful`
            };
            break;
          case 202:
            message.success = {
              code:202,
              message:"The request has been received but not yet acted upon"
            };
        }
        return this;
      },
      withData:function (data) {
        message.success.data = data;
        return this;
      },
      withErrorData:function (data) {
        message.error.data = data;
        return this;
      },

      withPagination: function(){


        if (message.success.data){


          // Protect your data at all cost
          let lastId = null;
          try{
             lastId      = message.success.data[message.success.data.length - 1].id;

          }catch (e) {
            console.log(e);
          }


          let payLoad       = {data:lastId};
          let newToken;

          //Implement JWT
          var privateKey = fs.readFileSync('jwt_pk.key','utf8');

        return new Promise((resolve,reject)=>{

            jwt.sign(payLoad,privateKey, { expiresIn: '2h',algorithm: 'RS256' },   (err,code)=> {

              if (err){

                reject(err)
              }else{

                newToken = code;
                message.success.pagination = {
                  prevPageToken : req.query.pagination?req.query.pagination.nextPageToken:undefined,
                  nextPageToken : newToken
                };
                resolve(this);
              }
            });

          });

        }
      },
      reply:function () {

        message.success?res.status(message.success.code).json(message):res.status(message.error.code).json(message);
        return;
      }

    };



    let paginationHelper = {
      paginate:  function (colomn) {


        let payload =  jwtVerifier(req.query.paginationToken)||null;
        if (payload) {
          let x = req.query.q = {
            [colomn||'id']:{
              [Op.gt]: payload.data
            }
          }


        }
      }
    };
    Object.assign(res,smoochObj);
    Object.assign(req,paginationHelper);


    next();
  }
}

module.exports = smooch;