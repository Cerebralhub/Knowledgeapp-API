'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'videos',
          'statusId',
          {
            type: Sequelize.INTEGER,
            references: {
                model: 'Statuses',
                key: 'id'
              },
          }
        ),
        queryInterface.addColumn(
            'videos',
            'video_thumbnail',
            {
              type: Sequelize.STRING,
            }
          )
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('videos', 'statusId'),
        queryInterface.removeColumn('videos', 'video_thumbnail')
      ]);
    }
  };