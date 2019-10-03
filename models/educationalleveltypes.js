'use strict';
module.exports = (sequelize, DataTypes) => {
  const educationalLevelTypes = sequelize.define('educationalLevelTypes', {
    name: DataTypes.STRING
  }, {});
  educationalLevelTypes.associate = function(models) {
    // associations can be defined here
  };
  return educationalLevelTypes;
};