'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_categories = sequelize.define('user_categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  user_categories.associate = function(models) {
    // associations can be defined here
  };
  return user_categories;
};