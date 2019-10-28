'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('UserTypes', [
        {
          name: 'learner',
          createdAt   :  new Date(),
          updatedAt   :  new Date(),

        },
        {
          name: 'educator',
          createdAt   : new Date(),
          updatedAt   : new Date(),

        },
        {
          name: 'admin',
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
