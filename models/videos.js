'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Videos extends Models{}

let videos = Videos.init({
  video_name: {
    type: DataTypes.STRING,
    validate: {
      isNull: false,
    }
  },
  video_category: {
    type: DataTypes.INTEGER,
  },
  video_url: {
    type: DataTypes.STRING,
    validate: {
      isNull: false,
    }
  },
  video_description: {
    type: DataTypes.TEXT,
    validate: {
      isNull: false,
    }
  }
}, {
  sequelize,
  modelName: 'videos'
});

// module.exports = (sequelize, DataTypes) => {
//   const videos = sequelize.define('videos', {
//     name: DataTypes.STRING
//   }, {});
//   videos.associate = function(models) {
//     // associations can be defined here
//   };
//   return videos;
// };

module.exports = videos;