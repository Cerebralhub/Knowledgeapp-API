
let express     = require('express');
let formData    = require("express-form-data");
let os          = require("os");
var cors        = require('cors');
let router      = express.Router();
let user        = require('../controllers/user');
let farm        = require('../controllers/farms');
let anonymous   = require('../controllers/anonymous');
let session     = require('../middlewares/session');
let admin       = require('../middlewares/admin');
let superAdmin  = require('../middlewares/superAdmin');
let fileUpload  = require('../middlewares/fileUploader');
let passwordConf = require('../middlewares/passWordConf');
let isLoggedIn                                     = require('../middlewares/isLoggedIn');
let acceptedHeader                                 = require('../middlewares/acceptedHeader');
let validationHandler                              = require('../middlewares/errorHandler');
let smooch                                         = require('../helpers/smooch');
let {farmCreationValidator,deleteFarmActivityValidator,farmUpdateValidator,allFarmsValidator,farmActivityValidator,farmUpdateActivityValidator,allFarmActivityValidator}    = require('../validators/farms');




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
   //smooch middleware for helping in api response
   app.use(smooch());
   session(router);
  router.use(cors(options));
  //user api
  router.get('/email/exists', cors(corsOptions), (req,res)=> {user.validateEmail(req,res)});
  router.post('/password/reset/init', cors(corsOptions), (req,res)=> {user.passwordResetInitializer(req,res)});
  router.post('/password/reset', cors(corsOptions), (req,res)=> {user.passwordReset(req,res)});
  router.post('/sign-up',cors(corsOptions),  (req,res)=> {user.create(req,res)});
  router.post('/login', cors(corsOptions), (req,res)=> {user.login(req,res)});
  router.post('/logout', cors(corsOptions), (req,res)=> {user.logout(req,res)});
  router.get('/user',cors(corsOptions), (req,res)=> {user.getUser(req,res)});
  router.get('/user/:userId/status/:userStatus', isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.status(req,res)});

  router.get('/users',isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.all(req,res)});
  router.get('/users/types',isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.types(req,res)});
  router.post('/user/update', isLoggedIn(),cors(corsOptions), (req,res)=> {user.update(req,res)});
  router.get('/user/investments',isLoggedIn(), cors(corsOptions), (req,res)=> {user.investments(req,res)});
  router.post('/user/admin/create',[isLoggedIn(),superAdmin(),cors(corsOptions)], (req,res)=> {user.createAdmin(req,res)});
  router.get('/user/summary',isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.summary(req,res)});
  router.get('/user/investor/summary',isLoggedIn(), cors(corsOptions),(req,res)=> {user.investorSummary(req,res)});
  router.post('/user/verify', cors(corsOptions),(req,res)=> {user.verify(req,res)});
  router.post('/user/re-verify', cors(corsOptions),(req,res)=> {user.reVerify(req,res)});
  router.get('/user/summary',isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.summary(req,res)});
  router.get('/user/invoice/summary/:slugId',isLoggedIn(),admin(),cors(corsOptions), (req,res)=> {user.getInvoiceSummary(req,res)});





  //farm api
  router.post('/farms/create',[cors(corsOptions),isLoggedIn(),admin()].concat(farmCreationValidator()),(req,res)=>{farm.create(req,res)});
  router.post('/farms/update/:farmId',[cors(corsOptions),isLoggedIn(),admin()].concat(farmUpdateValidator()),(req,res)=>{farm.update(req,res)});
  router.get('/farms/all', [cors(corsOptions)].concat(allFarmsValidator()), (req,res)=> {farm.all(req,res)});
  router.post('/farms/activities/create/:farmId',[isLoggedIn(),admin(),cors(corsOptions)].concat(farmActivityValidator()),(req,res)=>{farm.activity(req,res)});
  router.post('/farms/activities/update/:updateId',[isLoggedIn(),admin()].concat(farmUpdateActivityValidator()),(req,res)=>{farm.updateActivity(req,res)});
  router.get('/farms/activities/all',[isLoggedIn(),cors(corsOptions)].concat(allFarmActivityValidator()),(req,res)=>{farm.allActivity(req,res)});
  router.post('/farms/activities/:activitiesId',[isLoggedIn(),admin(),cors(corsOptions)].concat(farmActivityValidator()),(req,res)=>{farm.allActivity(req,res)});
  router.get('/farms/:farmId/investments',[isLoggedIn(),admin(),cors(corsOptions)],(req,res)=>{farm.investments(req,res)});
  router.post('/farms/activities/:activitiesId/delete',[isLoggedIn(),admin(),cors(corsOptions)].concat(deleteFarmActivityValidator()),(req,res)=>{farm.deleteFarmActivity(req,res)});
  router.get('/farms/categories', cors(corsOptions), (req,res)=> {farm.categories(req,res)});
  router.get('/farms/status/:farmId/:farmStatus',[isLoggedIn(),admin(),cors(corsOptions)], (req,res)=> {farm.status(req,res)});
  router.get('/farms/:farmId',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.singleFarm(req,res)});
  router.post('/farms/invoice/create',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.payStackInit(req,res)});
  router.post('/farms/invoice/offline/create',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.offlineInvoice(req,res)});
  router.post('/farms/invoice/pay',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.payInvoice(req,res)});
  router.post('/farms/relationship/:farmSlug/:relType',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.follow(req,res)});
  router.get('/farms/user/:follow',[isLoggedIn(),cors(corsOptions)], (req,res)=> {farm.all(req,res)});
  router.post('/farms/investment/:investmentId/pay',[isLoggedIn(),superAdmin(),cors(corsOptions)], (req,res)=> {farm.payInvestment(req,res)});
  router.post('/farms/investment/offline/invoice/pay',[isLoggedIn(),superAdmin(),cors(corsOptions),passwordConf()], (req,res)=> {farm.offlineInvestment(req,res)});


  //Anonymous api Calls
  router.get('/locations',  cors(corsOptions),(req,res)=> {anonymous.locations(req,res)});
  router.get('/banks',cors(corsOptions),(req,res)=> {anonymous.banks(req,res)});





  app.use("/api/v1",router);

}


