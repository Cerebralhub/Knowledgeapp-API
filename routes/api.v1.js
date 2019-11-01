
let express     = require('express');
let formData    = require("express-form-data");
let os          = require("os");
var cors        = require('cors');
let router      = express.Router();
let superAdmin  = require('../controllers/superAdmin');
let user        = require('../controllers/users');
// let admin       = require('../middlewares/admin');
let isSuperAdmin               = require('../middlewares/superAdmin');
let fileUpload                 = require('../middlewares/fileUploader');
let passwordConf               = require('../middlewares/passWordConf');
let isLoggedIn                 = require('../middlewares/isLoggedIn');
let acceptedHeader             = require('../middlewares/acceptedHeader');
let validationHandler          = require('../middlewares/errorHandler');
let youtubeSaver               = require('../middlewares/youtube_videos_upload');
let smooch                     = require('../helpers/smooch');
let multer                     = require('multer');
let YoutubeStorage             = require('../helpers/youtube_storage');


module.exports.apiV1 =  function (app) {

  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  let corsOptions = {
    origin: true,
    credentials: true,
  };


    app.use(express.urlencoded({extended:true}));
   //smooch middleware for helping in api responses and pagination
   app.use(smooch());
   router.use(cors(options));

   router.get('/', (req, res) => {
     return res.status(200).send({
       message: 'Dear Nerd, you have landed on the API!!'
     })
   });

   let youtubeStorage= new YoutubeStorage({
       parameters:function (req,file,cb) {


           let reqBody = {
               snippet:{
                   title        :req.body.title,
                   description  :req.body.description,
                   tags         :req.body.tags
               }
           }
           cb(null,reqBody);
       },
       mimeType:'video/*'
   });

  //General
    router.post('/login',multer().none(),  cors(corsOptions),(req,res)=> {user.login(req,res)});
    router.get('/user/verify/:email/:token',  multer().none(),cors(corsOptions),(req,res)=> {user.verify(req,res)});
    router.post('/password/reset/init', multer().none(), cors(corsOptions),(req,res)=> {user.passwordResetInit(req,res)});
    router.post('/password/reset/:token',  multer().none(),cors(corsOptions),(req,res)=> {user.passwordReset(req,res)});

  //Super Admin Routes
    router.post('/admin/users/create',multer().none(), cors(corsOptions),(req,res)=> {superAdmin.create(req,res)});
    router.get('/admin/users', [isLoggedIn(), isSuperAdmin(), multer().none(), cors(corsOptions)],(req,res)=> {superAdmin.getUsers(req,res)});
    router.get('/admin/users/update', [isLoggedIn(), isSuperAdmin(), multer().none(),cors(corsOptions)],(req,res)=> {superAdmin.updateUser(req,res)});
    router.post('/admin/video/create', isLoggedIn(), isSuperAdmin(),multer({
            storage:youtubeStorage
        })
        .single('video'), cors(corsOptions),(req,res)=> {superAdmin.uploadVideos(req,res)});









  app.use("/v1",router);

}


