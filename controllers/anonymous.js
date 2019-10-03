const db                          = require("../helpers/db");
const status                      = require("../config/status");

module.exports = class anonymous{

  static  locations(req,res){
    let query = "SELECT * FROM states ";
    let values = [];
    return db.query(query,values).then((result)=>{
      res.withSuccess(200).withData(result).reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }

  static  isUnique(table,column,value){
    let query = `SELECT * FROM ${table} WHERE ${column} = ? `;
    let values = [value];
    return new Promise((resolve,reject)=>{
      db.query(query,values).then(function (data) {
        if (Object.keys(data).length > 0){
          //reject if the slug exists
          reject(true)
        }else{
          //resolve if the slug doesn't exist
          resolve(false);
        }
      })
    })
  }

  static slugOn (table,column){
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

    return new Promise((resolve,reject)=>{
      this.isUnique(table,column,result).then((data)=>{
        resolve(result)
      }).catch(()=>{
        this.slugOn(table,column);
      })
    })


  }

  static  createFarmInvoice(req,res){
    let slug;
    this.slugOn("purchased_farms","slug").then(function (slug) {
       slug = slug;

    })
    let values = [slug,req.body.farm_id,req.session.userId,status.unpaid];
    let query = "INSERT INTO purchased_farms (slug,farm_id,user_id,quantity,status) VALUES (?,?,?,?,?)";
    return db.query(query,values).then((result)=>{
      res.withSuccess(200).withData(result).reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }

  static banks(req,res){
    let query = "SELECT * FROM banks";
    return  db.query(query,[]).then(function (result) {
      res.withSuccess(200).withData(result).reply();
    }).catch(function (error) {
      res.withServerError(500).reply();
    })
  }

}