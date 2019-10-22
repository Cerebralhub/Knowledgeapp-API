'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Status extends Model{}

let status = Status.init({
  name: {
    type: DataTypes.STRING,
    unique: true,
  }
}, {
  sequelize: sequelize,
  modelName: status
});

Status.associate = function(models) {
  Status.hasMany(models.users, {
    foreignKey: 'statusId',
    key: 'id'
  })
}

// module.exports = (sequelize, DataTypes) => {
//   const Status = sequelize.define('Status', {
//     id: DataTypes.INTEGER
//   }, {});

//   Status.associate = function(models) {
//     // associations can be defined here
//     Status.hasMany(models.users, {
//       foreignKey: 'status',
//       key: 'statusID'
//     })
//   };
//   return Status;
// };

module.exports = status;