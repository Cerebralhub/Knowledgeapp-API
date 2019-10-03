module.exports = function isLoggedIn(){
  return function (req,res,next){
     req.session?req.session.email?next():
       res.withClientError(401).reply():
       res.withClientError(401).reply();
  }
}