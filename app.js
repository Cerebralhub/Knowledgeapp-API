global.__basedir 	= __dirname;
const dotenv        = require('dotenv');
dotenv.config();
var  server    		= 	require('./bootstrap/server.js');
server 				    = 	new server();
server.start();

