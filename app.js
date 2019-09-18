global.__basedir 	= __dirname;
var  server    		= 	require('./bootstrap/server.js');

server 				    = 	new server();
server.start();

