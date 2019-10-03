'use strict';
module.exports = (sequelize, DataTypes) => {
  const videos = sequelize.define('videos', {
    name: DataTypes.STRING
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
  };
  return videos;
};