const express      	= require('express');
const app           = express();
let {apiV1} 		= require('../routes/api.v1');
var cors            = require('cors');
const dotenv        = require('dotenv');
dotenv.config();



module.exports = class server{


  start(){
    //middlewares
    app.use('/api/v1',express.static('static'));


    //routes
    apiV1(app);

    app.listen(process.env.API_PORT,(err)=>{
      console.log('> server started on port '+process.env.API_PORT);
    });

    app.on('error',(err)=>{
      console.log(err);
      return;
    })



  }
}

