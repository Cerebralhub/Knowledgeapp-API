'use strict';
const { Model, DataTypes }                  =   require('sequelize');
const sequelize                            =    require('../config/database');

class Users extends Model{}


 let users =  Users.init(
     {
                first_name: {
                  type:DataTypes.STRING,
                  validate:{
                    isNull:false,

                  }
                },
                last_name: {
                  type:DataTypes.STRING,
                  validate:{
                    isNull:false,

                  }
                },
                user_name:{
                  //User Names shouldn't be more than 50 characters
                  //TODO validate user_name uniqueness//
                  type:DataTypes.STRING(50),
                  validate:{
                    isNull:false,
                    max:50
                  },
                  category:{
                    type:DataTypes.INTEGER,
                    validate:{
                      isNumeric:true
                    }
                  }
                },
                email: {
                  type:DataTypes.STRING,
                  validate:{
                    isEmail: true
                  }
                },
                dob:{
                  type:DataTypes.DATEONLY,
                  validate:{
                    isDate:true
                  }
                },
                password:{
                 type:DataTypes.STRING(550),
                 validate:{
                   isNull:false
                 }
               },
                status:{
                    type:DataTypes.INTEGER,
                    validate:{
                        isNull:false
                    }
                },
                userType:{
                    type:DataTypes.INTEGER,
                    validate:{
                        isNull:false
                    }
                },
                resetKey:{
                    type:DataTypes.INTEGER,
                    validate:{
                        isNull:false
                    }
                },
                emailVerifiedAt:{
                    type:DataTypes.DATE,
                    validate:{
                        isNull:true
                    }
                }
               },
     {
                 sequelize:sequelize,
             }
             );
    users.associate = function(models) {
        // associations can be defined here
    };


  module.exports = users;
