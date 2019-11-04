'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videos = sequelize.define('Videos', {
    video_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_category: {
      type: DataTypes.INTEGER,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  Videos.associate = function(models) {
    // associations can be defined here
  };
  
  return Videos;
};