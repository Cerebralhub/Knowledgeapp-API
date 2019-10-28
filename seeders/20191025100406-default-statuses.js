'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Statuses', [
          {
              name        : 'active',
              createdAt   :  new Date(),
              updatedAt   :  new Date(),
          },
          {
              name        : 'deactivate',
              createdAt   :  new Date(),
              updatedAt   :  new Date(),


          },
          {
              name        : 'unverified',
              createdAt   :  new Date(),
              updatedAt   :  new Date(),
          }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
