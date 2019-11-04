'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'UserTypes',
          'statusId',
          {
            type: Sequelize.INTEGER,
            references: {
                model: 'Statuses',
                key: 'id'
              },
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('UserTypes', 'statusId')
      ]);
    }
  };