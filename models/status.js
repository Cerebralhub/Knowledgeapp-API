'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    id: DataTypes.INTEGER
  }, {});
  Status.associate = function(models) {
    // associations can be defined here
  };
  return Status;
};