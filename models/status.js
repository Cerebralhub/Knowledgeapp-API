'use strict';



module.exports = (sequelize, DataTypes) => {
  
  // const User = require('../models/user');

  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  // Status.associate = function(models) {
    // Status.hasMany(models.user, {
    //   foreignKey: 'statusId',
    //   key: 'id'
    // });
  
    // Status.hasMany(models.categories, {
    //   foreignKey: 'statusId',
    //   key: 'id'
    // })
  // }

  Status.associate = function(models) {
    // Status.hasMany(models.categories, {
    //   foreignKey: 'statusId',
    //   key: 'id'
    // })
    Status.hasMany(models.User, {
      foreignKey: 'statusId',
      as: 'userStatusId'
    });

    Status.hasMany(models.UserTypes, {
      foreignKey: 'statusId',
      as: 'userTypesStatusId'
    });

    Status.hasMany(models.Videos, {
      foreignKey: 'statusId',
      as: 'videosStatusId'
    })
  };

  // Status.hasMany(User);
  // User.belongsTo(Status);

  
  return Status;
};

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

