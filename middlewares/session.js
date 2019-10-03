var expressSession  = require('express-session');
var RedisStore      = require('connect-redis')(expressSession);

module.exports = function session (app) {
  app.use(expressSession({
    store: new RedisStore({
      hosts: 'localhost',
      port:	'6379',
      prefix: 'session:',
      logErrors:true
    }),
    saveUninitialized:false,
    secret: 'easy cow secret',
    cookie: {
              sameSite:false
            },
    name: 'easycowSession',
    resave: false
  }));
}
