'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      user_name: {
        allowNull:false,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING(550)
      },
      status:{
        allowNull:false,
        type:Sequelize.INTEGER,
      },
      email: {
        allowNull:false,
        type: Sequelize.STRING
      },
      emailVerifiedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      resetkey:{
        allowNull:false,
        type:Sequelize.STRING(400)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};