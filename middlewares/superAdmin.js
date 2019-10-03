let user            = require('../controllers/user');
let userType        = require('../config/userTypes');

module.exports = function superAdmin(){
  return function (req,res,next) {
    user.userDet(req,res).then( (result)=> {
      if (Object.keys(result).length > 0 && result[0].user_type === userType.superAdmin){
        next();
      }else{
        res.json({status:200,message:'Permission Denied'});
      }
    })
  }
}