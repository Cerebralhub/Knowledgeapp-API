'use strict'
var mysql           = require('mysql');

let smooch = function (options) {
  let smoochOptions = options||{};
  return function (req,res,next) {
    let message ={};
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
              message:"Permisstatuses.activesion Denied. You must log in"
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
      reply:function () {

        message.success?res.status(message.success.code).json(message):res.status(message.error.code).json(message);
        return;
      }

    };



    let paginationHelper = {
      paginate: function (perPage) {
        if (req.query.paginate) {
          req.query.page?"":req.query.page  = 1;
          typeof perPage !== "number"? new Error("number of pages must be an integer"):'';
          req.query.page = parseInt(req.query.page,10);
          let nextRecords = (req.query.page - 1) * perPage;
          req.paginate.nextPage = req.query.page + 1;
          return `LIMIT ${perPage} OFFSET ${mysql.escape(nextRecords)}`;
        }
        return '';
      }
    };
    Object.assign(res,smoochObj);
    Object.assign(req,paginationHelper);

    next();
  }
}

module.exports = smooch;