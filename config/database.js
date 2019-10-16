const {Sequelize}           = require('sequelize');
let db                      =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql'
})

// console.log('> Initializing Database')
// db

module.exports = db;

