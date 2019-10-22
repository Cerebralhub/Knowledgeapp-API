'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// const Status = require('./status');

class Users extends Model{}

 let users = Users.init({
   id: {
     type: DataTypes.INTEGER,
     validate: {
       isNull: false,
     }
   },
    first_name: {
      type: DataTypes.STRING,
      validate: {
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
      unique: true,
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
      unique: true,
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
    }, { 
      sequelize, 
      modelName: 'user' 
    });

    users.associate = function (models) {
      users.belongsTo(models.Statuses);
    };

  // users.associate = function(models) {
  //     Users.hasMany(models.status, {
  //       foreignKey: 'statusId',
  //       as: 'id'
  //     })
  // };

  // Users.hasMany(Status);

module.exports = users;
