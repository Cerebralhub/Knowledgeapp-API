let user            = require('../controllers/user');
let userType        = require('../config/userTypes');

module.exports = function admin(){
  return function (req,res,next) {
    user.userDet(req,res).then( (result)=> {
      if (Object.keys(result).length > 0 && (result[0].user_type === userType.admin || result[0].user_type === userType.superAdmin)){
        next();
      }else{
        res.withClientError(400).reply();
      }
    })
  }
}