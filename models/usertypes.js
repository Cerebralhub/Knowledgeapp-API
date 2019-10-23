'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTypes = sequelize.define('UserTypes', {
    name: DataTypes.STRING
  }, {});
  UserTypes.associate = function(models) {
    // associations can be defined here
    UserTypes.hasMany(models.users , {
      foreignKey: 'userType',
      key: 'id'
    })
  };
  return UserTypes;
};