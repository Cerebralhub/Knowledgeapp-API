
let express     = require('express');
let formData    = require("express-form-data");
let os          = require("os");
var cors        = require('cors');
let router      = express.Router();
let superAdmin  = require('../controllers/superAdmin');
let user        = require('../controllers/users');
// let admin       = require('../middlewares/admin');
let isSuperAdmin = require('../middlewares/superAdmin');
let fileUpload  = require('../middlewares/fileUploader');
let passwordConf = require('../middlewares/passWordConf');
let isLoggedIn                                     = require('../middlewares/isLoggedIn');
let acceptedHeader                                 = require('../middlewares/acceptedHeader');
let validationHandler                              = require('../middlewares/errorHandler');
let smooch                                         = require('../helpers/smooch');
// let {farmCreationValidator,deleteFarmActivityValidator,farmUpdateValidator,allFarmsValidator,farmActivityValidator,farmUpdateActivityValidator,allFarmActivityValidator}    = require('../validators/farms');




module.exports.apiV1 =  function (app) {

  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  let corsOptions = {
    origin: true,
    credentials: true,
  }



  // parse data with connect-multiparty.
   app.use(formData.parse(options));
   app.use(formData.format());
   app.use(express.urlencoded({extended:true}));
   //smooch middleware for helping in api responses and pagination
   app.use(smooch());
   router.use(cors(options));

   router.get('/', (req, res) => {
     return res.status(200).send({
       message: 'Dear Nerd, you have landed on the API!!'
     })
   })

  //General
    router.post('/login',  cors(corsOptions),(req,res)=> {user.login(req,res)});
    router.get('/user/verify/:email/:token',  cors(corsOptions),(req,res)=> {user.verify(req,res)});
    router.post('/password/reset/init',  cors(corsOptions),(req,res)=> {user.passwordResetInit(req,res)});
    router.post('/password/reset/:token',  cors(corsOptions),(req,res)=> {user.passwordReset(req,res)});



  //Super Admin Routes
    router.post('/admin/users/create', isLoggedIn(), isSuperAdmin(), cors(corsOptions),(req,res)=> {superAdmin.create(req,res)});
    router.get('/admin/users', isLoggedIn(), isSuperAdmin(), cors(corsOptions),(req,res)=> {superAdmin.getUsers(req,res)});
    router.get('/admin/users/update', isLoggedIn(), isSuperAdmin(), cors(corsOptions),(req,res)=> {superAdmin.updateUser(req,res)});









  app.use("/v1",router);

}


