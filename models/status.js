'use strict';

module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Status.associate = function(models) {
  //   Status.belongsTo(models.users, {
  //     foreignKey: 'statusId',
  //     key: 'id'
  //   })
  
  //   Status.belongsTo(models.categories, {
  //     foreignKey: 'statusId',
  //     key: 'id'
  //   })
  // }

  Status.belongsTo(User);
  User.hasMany(Status);

  
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

