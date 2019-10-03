module.exports =    {

    cors: function (req,res,next){
     res.header("Access-Control-Allow-Origin", "*");
     next();
   },

    json: function (req, res, next) {
    if (req.get('application/json')  ){
      next();
    }else{
      res.status(400).send('Bad Content type');
    }
  },
  
    urlEncoded: function (req,res,next) {
    if (req.is('application/x-www-form-urlencoded') ){
      next();
    }else{
      res.status(400).send('Bad Content type');
    }

  },

    formData: function (req,res,next) {
    if (req.is('multipart/form-data')){
      next();
    }else{
      res.status(406).send('Bad Content type');
    }

  }
  
}