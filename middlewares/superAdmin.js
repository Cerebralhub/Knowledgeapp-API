let user            = require('../controllers/superAdmin');
let userType        = require('../config/userTypes');

module.exports = function superAdmin(){
  return function (req,res,next) {
    if (req.payLoad.userType != userType.admin){
      res.withClientError(403).reply();
    }else{
      next();
    }
  }
}