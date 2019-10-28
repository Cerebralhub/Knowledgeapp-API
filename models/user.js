'use strict';
const { Model, DataTypes }                  =   require('sequelize');
const sequelize                             =    require('../config/database');
class Users extends Model{}


 let users =  Users.init(
     {
                first_name: {
                  type:DataTypes.STRING,
                    allowNull: false,

                },
                last_name: {
                  type:DataTypes.STRING,
                    allowNull: false,

                },
                user_name:{
                  //User Names shouldn't be more than 50 characters
                  //TODO validate user_name uniqueness//
                  type:DataTypes.STRING(50),
                    allowNull: true,

                  validate:{
                    max:50,
                      isUnique:function(value){
                        if (value){

                            return users.findOne({
                                where:{userName:value}
                            }).then((user)=>{
                                if (user) {
                                    throw new Error('Email already in use');
                                }
                            })
                        }
                      }
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
                    allowNull: false,

                    validate:{
                    isEmail: true,
                    isUnique:function(value){
                     return users.findOne({
                                where:{email:value}
                            }).then((user)=>{
                                 if (user) {
                                     throw new Error('Email already in use');
                                 }
                            })
                    }

                  },
                },
                dob:{
                  type:DataTypes.DATEONLY,
                  validate:{
                    isDate:true
                  }
                },
                password:{
                 type:DataTypes.STRING(550),
                    allowNull: false,

                },
                statusId:{
                    type:DataTypes.INTEGER,
                    allowNull: false,

                },
                userType:{
                    type:DataTypes.INTEGER,
                    allowNull: false,

                },
                resetKey:{
                    type:DataTypes.INTEGER,
                    allowNull: true,

                },
                emailVerifiedAt:{
                    type:DataTypes.DATE,
                    allowNull: true,

                },

               },
 {
             sequelize:sequelize,
         }
             );
    users.associate = function(models) {
        // associations can be defined here
    };


  module.exports = users;
