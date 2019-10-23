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
    UserTypes.hasMany(models.users , {
      foreignKey: 'userType',
      key: 'id'
    })
  };
  return UserTypes;
};