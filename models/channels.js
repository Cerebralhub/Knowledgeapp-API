'use strict';
module.exports = (sequelize, DataTypes) => {
  const channels = sequelize.define('channels', {
    owned_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    verifed_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  channels.associate = function(models) {
    // associations can be defined here
  };
  return channels;
};