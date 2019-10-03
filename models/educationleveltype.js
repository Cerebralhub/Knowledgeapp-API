'use strict';
module.exports = (sequelize, DataTypes) => {
  const educationLevelType = sequelize.define('educationLevelType', {
    name: DataTypes.STRING
  }, {});
  educationLevelType.associate = function(models) {
    // associations can be defined here
  };
  return educationLevelType;
};