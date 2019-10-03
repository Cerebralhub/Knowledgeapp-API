// let db					    =  require('../config/database.js');
// let connection      =  new db();
//
// module.exports = class dbHelper {
//
//   static query(query,values,req){
//
//     return new Promise((resolve,reject)=>{
//       connection.query(query,values,function (error,results,field) {
//
//         if (error){
//           reject(error);
//           console.log(error);
//         }
//         if(req){
//
//           if (req.query.paginate){
//             let paginateObj = {
//               nextPage:req.query.nextPage + 1
//             };
//             if (results){
//               results =  Object.assign(results,paginateObj);
//             }
//           }
//         }
//         resolve(results);
//
//       })
//     })
//
//   }
//
//
// }