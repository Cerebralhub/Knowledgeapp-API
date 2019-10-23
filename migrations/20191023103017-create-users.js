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
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING(550)
      },
      statusId: {
        allowNull:false,
        type:Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        },
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      emailVerifiedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING,
        // references: {
        //   model: 'UserTypes',
        //   key: 'id'
        // },
      },
      category: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Categories',
        //   key: 'id'
        // },
      },
      dob: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      resetkey:{
        allowNull: true,
        type:Sequelize.STRING(400)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
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