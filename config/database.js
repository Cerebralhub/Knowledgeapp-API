const mysql           = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

module.exports = class Database{

  constructor(){

    //use different user name depending on the enviroment


    this.settings =  {
      host: 'localhost',
      user:process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    };

    let connection = mysql.createConnection(this.settings);
    connection.connect(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return connection;
  }
}
