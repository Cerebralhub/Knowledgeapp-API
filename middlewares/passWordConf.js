let passwordHelper =  require( '../helpers/passwordHelper');
let user            = require('../controllers/user');

module.exports = function passWordConf(){
    return function (req,res,next) {
        user.userDet(req,res).then( (result)=> {
            if (Object.keys(result).length > 0){
                return passwordHelper.isSame(req.body.password,result[0].password);
            }else{
                res.withClientError(400).reply();
            }
        }).then((state)=>{
            if (state){
                next();
            }else{
                res.withClientError(401).reply();
            }
        })
    }
}