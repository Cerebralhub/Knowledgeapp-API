const db                          = require("../helpers/db");
let {operate}                     = require('../helpers/qSorta')();
let fileUploader                  = require('../helpers/fileUploader');
let anonymous                     = require('../controllers/anonymous');
let status                        = require('../config/status');
let paystackConf                  = require('../config/paystack');
console.log(paystackConf.sk,'pay conf')
let paystack                      = require('paystack')(paystackConf.sk);
let passwordHelper                = require("../helpers/passwordHelper");
let Mailer                        = require("../helpers/mailer");
let {duration,payBackDate,interest}        = require("../helpers/investment");

module.exports = class farms {
  static create(req,res){
    let filePath;
    let farmSlug;
    let values = [
      req.body.title,
      req.body.category,
      req.body.total_units,
      req.body.price_per_unit,
      req.body.funding_starts,
      req.body.funding_ends,
      req.body.farm_starts,
      req.body.farm_ends,
      req.body.roi,
      req.body.location,
      req.body.description,
      req.body.status
    ];
    console.log(req.body.status,'status')
    let query = "INSERT INTO farms (title,category,total_units,price_per_unit,funding_starts,funding_ends,farm_starts,farm_ends,roi,location,description,status,images,slug) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    //save file and return its location
    new fileUploader(req.files.farmThumbNail)
      .saveTo('farms-banner')
      .upload()
      .then((path)=>{
      filePath = path;
      values.push(JSON.stringify([filePath]));
      //create slug for the farm
      return anonymous.slugOn('farms','slug')
    }).then((slug)=>{
       farmSlug = slug;
      values.push(slug);
      return db.query(query, values);

    }).then((result)=>{
       res.withSuccess(201,"creation").reply();
    }).catch(function (error) {
          console.log(error)
       res.withServerError(500).reply();
    })
  }
  static update(req,res){

    let body = req.body;

    let values = [];
    let filePath;
    let  farmSlug;
    body.title? values.push(body.title):'';
    body.category? values.push(body.category):'';
    body.total_units? values.push(body.total_units):'';
    body.funding_starts? values.push(body.funding_starts):'';
    body.funding_ends? values.push(body.funding_ends):'';
    body.farm_starts? values.push(body.farm_starts):'';
    body.farm_ends? values.push(body.farm_ends):'';
    body.roi? values.push(body.roi):'';
    body.location? values.push(body.location):'';
    body.description? values.push(body.description):'';
    body.status? values.push(body.status):'';
    let query = `UPDATE farms SET ${body.title ? "title = ?" : ""},${body.category ? "category=?" : ""} ,${body.total_units ? "total_units=?" : ""} ,${body.funding_starts ? "funding_starts=?" : ""},${body.funding_ends ? "funding_ends=?" : ""},${body.farm_starts ? "farm_starts=?" : ""},${body.farm_ends ? "farm_ends=?" : ""},${body.roi ? "roi=?" : ""},${body.location ? "location=?" : ""},${body.description ? "description=?" : ""},${body.status ? "status=?" : ""}${ req.files.farmThumbNail ? ",images=?" : ""} WHERE farms.slug = ?`;

    //check if there was a request to reset the image
    if (req.files.farmThumbNail){


      //Upload the image to the desired destination
      new fileUploader(req.files.farmThumbNail)
        .saveTo('farm-images')
        .upload()
        .then((path)=>{
          filePath = path;
          //add the path to an array incase later in future releases there is need for multiple images
          values.push(JSON.stringify([filePath]));
          values.push(req.params.farmId);

          return db.query(query, values)
        }).then((result) => {
            res.withSuccess(201, "update").reply();
          }).catch(function (error) {
            res.withServerError(500).reply();
          })
    }else {
      console.log('i am here no ','path')

      values.push(req.params.farmId);
      return db.query(query, values)
        .then((result) => {
          res.withSuccess(201, "update").reply();
        }).catch(function (error) {
          res.withServerError(500).reply();
        })
    }
  }
  static exists(req){
    let query = "SELECT id FROM farms WHERE id = ?";
    let values = [req.query.farmId];
    return db.query(query,values);
  }

  static categories(req,res){
    let query = "SELECT * FROM categories";
    let values = [];
    return db.query(query,values).then((result)=>{
      res.withSuccess(200).withData(result).reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }

  static all(req,res){

    let values  = [];
    let body = req.query;

    //Logic changes based on the type of user i.e logged in user or not logged in user
    let followFarmJoin =  `followed_farms.user_id = ${req.session.userId?req.session.userId:"null"} AND followed_farms.farm_id = farms.id`;

    let query   = `SELECT farms.*,farms.id as farm_id,status.name as status_name,states.name as location_name,followed_farms.user_id,
      IF (ISNULL(followed_farms.user_id ),"false","true") AS followed, 
     (SELECT SUM (quantity) FROM purchased_farms WHERE purchased_farms.farm_id = farms.id ) as sold_out 
      FROM farms 
      INNER JOIN status ON status.id = farms.status 
      INNER JOIN states on states.id = farms.location
      ${req.params.follow === "followed"?"INNER":"LEFT"} JOIN followed_farms ON  ( ${followFarmJoin})  
      ${operate(req).on('title').on('category').on('total_units').on('price_per_units').on('funding_starts').on('funding_ends').on('farm_starts').on('farm_ends').on('roi').on('location').on('status','farms.status').done()} ${req.paginate(20)}`;

    return db.query(query,values,req).then( (farms)=> {
      let data = {};
      let parsedFarms = farms.map( (farm)=> {
        let parsedImages = [];
        if ( Array.isArray( JSON.parse(farm.images))){
          JSON.parse(farm.images).forEach( (image)=> {
            parsedImages.push(`${process.env.API_URL}\/${image}`);
          });
          farm.images = JSON.stringify(parsedImages);;
        }
        return farm;
      });
      data.farms    = parsedFarms;
      data.nextPage = req.paginate.nextPage;

      res.withSuccess(200).withData(data).reply();
    }).catch(function (er) {
      console.log(er,'error')
      res.withServerError(500).reply();
    })

  }

  static getSingleFarm(slug){
    let values  = [slug];

    let query   = `SELECT *,(SELECT SUM (quantity) FROM purchased_farms WHERE purchased_farms.farm_id = farms.id ) as sold_out FROM farms WHERE slug = ?`;
    return db.query(query,values)
  }
  static offlineInvoice(req,res){
    this.getSingleFarm(req.body.farmId).then((result)=>{
      let singleFarm = result[0];
      let slug;
      //check if farm is open,check if the farm is sold out
      if (singleFarm.sold_out < singleFarm.total_units && singleFarm.status === status.active){
        //create Invoice
        this.createInvoice(req,res,singleFarm).then((result)=>{
          slug = result;
          let amount = singleFarm.price_per_unit * req.body.units *100;
          //Offline payment Invoice
          let data = {
            amount:amount,
            farm:singleFarm,
            invoice_id:slug
          };
          let mail = new Mailer();

          mail.html(`<!DOCTYPE html>
                                    <html>
                                        <h4>Investment Invoice</h4>
                                        <p><b>Hi, ${req.session.email}</b></p>
                                        <p>You are about to make a payment with the following details:</p>
                                        <p><b>Invoice Id: </b> ${slug}</p>
                                        <p><b>Farm Name: </b> ${singleFarm.title}</p>
                                        <p><b>Price per Unit: </b>N${singleFarm.price_per_unit}</p>
                                        <p><b>Units: </b> ${req.body.units}</p>
                                        <p><b>Investment Value: </b>N${singleFarm.price_per_unit * req.body.units}</p>
                                        <p><b>Investment Duration:</b>${duration(singleFarm.farm_starts,singleFarm.farm_ends)} Months</p>
                                        
                                        <p><b>Amount PayAble:</b>N${interest(singleFarm.roi,(singleFarm.price_per_unit * req.body.units)) + (singleFarm.price_per_unit * req.body.units) }</p>
                                     
                                     </html>
                        `).subject("Farm Investments Invoice -Cow Funding")
              .recipient(req.session.email)
              .send("",3);
          res.withSuccess(201).withData(data).reply();
        }).catch(function (error) {
          console.log(error);
          res.withServerError(500).reply();
        })
      }else{
        res.withClientError(400).reply();
      }
    }).catch(function (err) {
      console.log(err,)
      res.withServerError(500).reply();
    })
  }
  static singleFarm(req,res){
   this.getSingleFarm(req.params.farmId)
    .then(function (result) {
      let parsedImages = [];
      let farm = result[0]||res.withClientError(404).reply();
      if (farm){
        if ( Array.isArray( JSON.parse(farm.images))){
          JSON.parse(farm.images).forEach( (image)=> {
            parsedImages.push(`${process.env.API_URL}\/${image}`);
          });

          farm.images = JSON.stringify(parsedImages);
        }
      }

      res.withSuccess(200).withData(farm).reply();
    }).catch(function (err) {
      console.log(err);
      res.withServerError(500).reply();
    })

  }
  static activity(req,res){

    let values;
    let query = "INSERT INTO farm_updates (information,summary,activity,stage,weeks,date,image_updates,farm_id)  SELECT ?,?,?,?,?,?,?,id FROM farms WHERE slug = ?";


  this.saveFileUpdates(req.files.image_update,0,[]).then(function (files) {
     values = [
      req.body.information,
      req.body.summary,
      req.body.activity,
      req.body.stage,
      req.body.weeks,
      new Date(Date.now()).toISOString(),
       JSON.stringify(files),
      req.params.farmId
    ];
    return db.query(query, values)
  }).then((result)=>{
      res.withSuccess(201,"creation").reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }
  static saveFileUpdates(files,index,values,promise){
    let self = this;
  return new Promise(function (resolve,reject) {
    (function name (files,index,values){
      new fileUploader(files[index])
        .saveTo('farm_updates')
        .upload()
        .then( (data)=> {
          values.push(data);
          if (files.length - 1 > index){

            index += index + 1;
             name(files,index,values);
          }else{
           resolve(values);
          }
        })
    }(files,index,values));

    })



  }
  static updateActivity(req,res){

    let body = req.body;

    let values = [];

    body.information? values.push(body.information):'';
    body.summary? values.push(body.summary):'';
    body.activity? values.push(body.activity):'';
    body.stage? values.push(body.stage):'';
    body.weeks? values.push(body.weeks):'';
    body.image_updates? values.push(body.image_updates):'';
    body.date? values.push(body.date):'';
    values.push(req.params.activityId);


    let query = `UPDATE farm_updates SET ${body.information?"information = ?":""},${body.summary?"summary=?":""} ,${body.stage?"stage=?":""} ,${body.weeks?"weeks=?":""},${body.image_updates?"image_updates=?":""},${body.date?"date=?":""} WHERE farm_updates.id = ?`;

    return db.query(query, values).then((result)=>{
      res.withSuccess(201,"update").reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }
  static allActivity(req,res){

    let values  = [];
    let body = req;
    let data = {};

    let query   = `SELECT farm_activities.*,
                   farm_status.name as farm_status_name,states.name as farm_location_name,farms.*,farm_activities.id as id 
                   FROM farm_updates AS farm_activities
                   JOIN farms on farms.id = farm_activities.farm_id 
                   INNER JOIN states on states.id = farms.location 
                   INNER JOIN status AS farm_status ON farm_status.id = farms.status 
                   ${operate(req).on('weeks')
                                  .on('date')
                                  .on('farm_status','farms.status')
                                  .on('farm_location','farms.location')
                                  .on('farm_status','farms.status')
                                  .on("farm_id","farms.slug")
                                  .done()+` AND farm_activities.status = ${status.active} `
                    }
                    
                    ${req.paginate(20)}`;
    return db.query(query,values,req).then(function (result) {
      data.activities    = result;
      data.nextPage      = req.paginate.nextPage;
      res.withSuccess(200).withData(data).reply();
    }).catch(function (err) {
      res.withServerError(500).reply();
    })

  }
  static  status(req,res){
    let status;
    switch (req.params.farmStatus) {
      case 'activate':
         status = 1;
      break;
      case 'de-activate':
        status = 2;
      break;
    }
    if (status){

      let query = "UPDATE farms SET status = ? WHERE id = ?";
      let values = [status,req.params.farmId];
      return db.query(query,values).then((result)=>{
        res.withSuccess(200).withData(result).reply();
      }).catch(function (error) {
        res.withServerError(500).reply();
      })
    } else{

      res.withClientError(400).reply();
    }
  }
  static deleteFarmActivity(req,res){

      let query = "UPDATE farm_updates SET status = ? WHERE id = ?";
      let values = [status.deleted,req.params.activitiesId];
      return db.query(query,values).then((result)=>{
        res.withSuccess(200).withData(result).reply();
      }).catch(function (error) {
        res.withServerError(500).reply();
      })
  }
  static createInvoice(req,res,singleFarm){
    return new Promise((resolve,reject)=>{
      anonymous.slugOn("purchased_farms","slug").then(function (slug) {
        let date = new Date(Date.now()).toISOString();
        let values = [slug,singleFarm.id,req.body.units,req.session.userId,status.unpaid];
        let query = "INSERT INTO purchased_farms (slug,farm_id,quantity,user_id,status) VALUES (?,?,?,?,?)";
        return db.query(query,values).then((result)=>{
          resolve(slug);
        })
      })
    })

  }
  static payStackInit(req,res){
    let genSlug;
    this.getSingleFarm(req.body.farmId).then((result)=>{
      let singleFarm = result[0];
      console.log(singleFarm,'single farm')

      //check if farm is open,check if the farm is sold out
      if (singleFarm.sold_out < singleFarm.total_units && singleFarm.status === status.active){
        //create Invoice

       this.createInvoice(req,res,singleFarm).then((result)=>{
         genSlug = result;
          let amount = singleFarm.price_per_unit * req.body.units *100;singleFarm.price_per_unit * req.body.units *100;
          //paystack stuff going on here
          return paystack.transaction.initialize({
            amount:amount,
            email:req.session.email,
            reference:genSlug,
            callback_url:req.body.paystack_cb
          });
        }).then(function (payStackResp) {

          //add farm slug to the paystack response
          payStackResp.data.farmId = req.body.farmId;
          //Send Invoice mail to user


         let mail = new Mailer();

         mail.html(`<!DOCTYPE html>
                                    <html>
                                        <h4>Investment Invoice</h4>
                                        <p><b>Hi, ${req.session.email}</b></p>
                                        <p>You are about to make an online payment with the following details:</p>
                                        <p><b>Invoice Id: </b> ${genSlug}</p>
                                        <p><b>Farm Name: </b> ${singleFarm.title}</p>
                                        <p><b>Price per Unit: </b>₦${singleFarm.price_per_unit}</p>
                                        <p><b>Units: </b> ${req.body.units}</p>
                                        <p><b>Investment Value: </b>N${singleFarm.price_per_unit * req.body.units}</p>
                                        <p><b>Investment Duration:</b> ${duration(singleFarm.farm_starts,singleFarm.farm_ends)}Months</p>
                                        
                                        <p><b>Return Value:</b>N${interest(singleFarm.roi,(singleFarm.price_per_unit * req.body.units)) + (singleFarm.price_per_unit * req.body.units) }</p>
                                        <a href=${payStackResp.data.authorization_url} style="background:green;padding:10px;color:white;">Pay Now</a>
                                     </html>
                        `).subject("Farm Investments Invoice - Cow Funding")
             .recipient(req.session.email)
             .send("",3);

          res.withSuccess(200).withData(payStackResp.data).reply();
        }).catch(function (error) {
          console.log(error);
          res.withServerError(500).reply();
        })
      }else{
        res.withClientError(400).reply();
      }
    }).catch(function (err) {
      console.log(err,)
      res.withServerError(500).reply();
    })
  }
  static updateUserPayment(req,res,userId){
    let query = "UPDATE purchased_farms SET status = ? WHERE slug = ? AND user_id = ? AND status = ?";
    let values = [status.invested,req.body.reference,userId,status.unpaid];
    db.query(query,values).then((result)=>{
      let resData;

      if (result.affectedRows > 0) {

        let query = `SELECT farms.*,
                 purchased_farms.date as invested_date,
                 users.email as investor_email,
                 users.name as investor_name,
                 farms.title as invested_farm,
                 purchased_farms.quantity as purchased_quantity,
                 status.name as investment_status,
                 (purchased_farms.quantity * farms.price_per_unit) AS invested_amount
                 FROM purchased_farms 
                 INNER JOIN farms ON farms.id = purchased_farms.farm_id
                 INNER JOIN status ON status.id = purchased_farms.status 
                 INNER JOIN users ON users.id = purchased_farms.user_id 
                 WHERE purchased_farms.slug = ? 
                 AND purchased_farms.user_id = ? 
                
                 `;
        let values  = [req.body.reference,userId];
        db.query(query, values).then( (result)=> {
          let details = result[0];
          let mail = new Mailer();
          mail.html(`<!DOCTYPE html>
                                    <html>
                                        <h4>Investment Successful</h4>
                                        <p><b>Hi, ${details.investor_name}</b></p>
                                        <p>Congratulations your payment was received by us here is the detail of your investment:</p>
                                        <p><b>Farm Name: </b> ${details.invested_farm}</p>
                                        <p><b>Price per Unit: </b>N${details.price_per_unit}</p>
                                        <p><b>Units Bought: </b> ${details.purchased_quantity}</p>
                                        <p><b>Investment Value: </b>N${details.invested_amount}</p>
                                        <p><b>Investment Duration:</b>${duration(details.farm_starts,details.farm_ends)} Months</p>
                                        <p><b>Payback Date:</b>${payBackDate(details.invested_date,duration(details.farm_starts,details.farm_ends))}</p>
                                        <p><b>Amount PayAble:</b>N${interest(details.roi,details.invested_amount) + details.invested_amount }</p>
                                        <a href=${process.env.APP_URL}"/user/farms" >click here to view your investments</a>
                                     </html>
                        `).subject("Farm Investments -Cow Funding")
              .recipient(details.investor_email)
              .send("",3);

        });

        resData = {
          slug: req.body.reference,
          invoice: {
            status: "paid"
          }
        }
        res.withSuccess(200).withData(resData).reply();
      }else{


        res.withClientError(400).withErrorData(resData).reply();
      }

    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }
  static payInvoice(req,res){

    paystack.transaction.verify(req.body.reference).then((result)=>{

      if (result.data.status === "success"){
        this.updateUserPayment(req,res,req.session.userId);
      }else{
        res.withServerError(500).reply();
      }
    }).caCOWFUNDINGtch(function (error) {
      res.withServerError(500).reply();
    })
  }
  static follow(req,res){
    let query;
    switch (req.params.relType) {
      case "follow":
         query = "INSERT INTO followed_farms (user_id,farm_id) SELECT ?,id FROM farms WHERE slug = ?";
        break;
      case "un-follow":
         query = "DELETE followed_farms FROM followed_farms INNER JOIN farms ON farms.id = followed_farms.farm_id WHERE user_id = ? AND farms.slug = ?";
      break;
    }
    let values = [req.session.userId,req.params.farmSlug,
    ];
    if (query){

      return db.query(query,values).then((data)=>{
        res.withSuccess(200).reply();
      }).catch(function () {
        res.withServerError(500).reply();
      })
    }else{
      res.withServerError(500).reply();
    }
  }
  static investments(req,res){
    let query     = `SELECT *, investor.name as investor_name, purchased_farms.date as invested_date,investor.id as investor_id ,
                     purchased_farms.slug as id,investment_status.name as investment_status,investment_status.id as investment_status_id
                     FROM purchased_farms 
                     INNER JOIN users AS investor ON investor.id = purchased_farms.user_id 
                     INNER JOIN farms on farms.id = purchased_farms.farm_id
                     INNER JOIN status AS investment_status ON investment_status.id = purchased_farms.status
                     WHERE farms.slug = ?
                     AND (purchased_farms.status = ? OR purchased_farms.status = ?)`;
    let values    = [req.params.farmId,status.invested,status.reimbursed];
    let data      = {};
    return db.query(query,values).then((result)=>{
      data['investments'] = result;
      let query = "SELECT * FROM farms WHERE id = ?";
      return db.query(query,values);
    }).then((result)=>{
      data["farm"] = result[0];
      res.withSuccess(200).withData(data).reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }
  static checkPassword(req){

    return new Promise((resolve,reject)=>{
      let query  = "SELECT password FROM users WHERE users.id = ?";
      let values =  [req.session.userId];
       db.query(query,values).then((userResult)=>{

           if (passwordHelper.isSame(req.body.password,userResult[0].password)){
             resolve(true);
           } else{
             reject(false);
           }

      })
    })
  }
  static payInvestment(req,res){
    this.checkPassword(req).then(function (result) {
      let query = "UPDATE purchased_farms SET status = ? WHERE slug = ? AND status = ?";
      let values = [status.reimbursed,req.params.investmentId,status.ripe];
     return db.query(query,values)
    }).then( (result)=> {
      if (result){
        res.withSuccess(200).reply();
      }else{
        res.withClientError(422).reply();
      }
    }).catch((err)=>{
      res.withServerError(500).reply();
    })
  }
  static offlineInvestment(req,res){

    this.updateUserPayment(req,res,req.body.investor_id);
  }

};
