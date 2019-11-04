'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTypes = sequelize.define('UserTypes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  UserTypes.associate = function(models) {
    // associations can be defined here
    // UserTypes.belongsTo(models.User , {
    //   foreignKey: 'userType',
    //   as: 'userTypeId'
    // }) 
    // User.belongsTo(models.Status, {
    //   foreignKey: 'id', 
    //   as: 'userstatusId'
    // });
  };
  return UserTypes;
};