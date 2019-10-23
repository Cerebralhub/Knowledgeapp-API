'use strict';
module.exports = (sequelize, DataTypes) => {
  const educationalLevelTypes = sequelize.define('educationalLevelTypes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  educationalLevelTypes.associate = function(models) {
    // associations can be defined here
  };
  return educationalLevelTypes;
};