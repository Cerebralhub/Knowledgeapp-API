'use strict';
  module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        unique: true,
      },
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dob:{
        type:DataTypes.DATEONLY,
        
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
    });
  
    User.associate = function(models) {
      // associations can be defined here
    };
    
    return User;
  }
