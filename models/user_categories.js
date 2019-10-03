'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_categories = sequelize.define('user_categories', {
    name: DataTypes.STRING
  }, {});
  user_categories.associate = function(models) {
    // associations can be defined here
  };
  return user_categories;
};