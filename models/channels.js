'use strict';
module.exports = (sequelize, DataTypes) => {
  const channels = sequelize.define('channels', {
    name: DataTypes.STRING
  }, {});
  channels.associate = function(models) {
    // associations can be defined here
  };
  return channels;
};