const sequelize           = require('sequelize');


module.exports = new sequelize('database', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql'
})
