let mysql   = require('mysql');
let sortOn  = require('./sortOn');

module.exports = function(){
  //?age[gte] = 4&age[lte] = 5

 let objects =  {
    queryFilter:  function(acceptedOperators,query){
      return (req,res,next)=>{

        let constructedString = '';

        //the query object we are checking E.g ?farmId[eql] = 4
        let queryObj = req.query[query];

        //{gte:4,lte:5}
        //confirm it exist
        if (queryObj){

          //confirm its an object that can be operated on
          if (typeof queryObj  !== 'object'){
            //
            queryObj = req.query[query];

          }


          //run through all elements in the array
          for (var element in queryObj){
              //Check through the validators and make sure it is accepted
            if (acceptedOperators.indexOf(element) > -1){

              constructedString += (constructedString !== ''?"OR ":'') +  `${this.translate(queryObj,element,query)}`;
            }
          }

          //reconstructed Query
          req.query[query] =  constructedString !== ''?`(${constructedString})`:undefined ;
        }
        next();
      }

    },
    translate:    function (query,queryOperator,sortType) {
        //mysql.escape converts the arrays to a string e.g [2,3] is converted to '1','2'
     switch (queryOperator) {
       case 'eql':

         return ` ${ this.build(mysql.escape(query[queryOperator]),"=",sortType)}`;
         break;
       case 'gte':
         return `${this.build( mysql.escape(query[queryOperator]),">",sortType)}`;
        break;

       case 'lte':
         return ` ${this.build(mysql.escape(query[queryOperator]),"<",sortType)} `;
         break;

       case 'gteOReqlTo':
         return ` ${this.build(mysql.escape(query[queryOperator]),">=",sortType)}`;
        break;

       case 'lteOReqlTo':
         return ` ${this.build(mysql.escape(query[queryOperator]),"<=",sortType)}`;
          break;

       case 'like':
         return `${this.build(mysql.escape(query[queryOperator]),"LIKE",sortType)}`;
         break;
        //There is not need to call the build function in the btw because it is taken care of here already
       case  'btw':
         let string = query[queryOperator].split("|",2);
         if(string.length === 2){
           return `Between ${mysql.escape(string[0])} AND ${mysql.escape(string[1])}`;
         }
         return '';
         break;

       case 'notEqlTo':
         return ` ${this.build(mysql.escape(query[queryOperator]),"!=")}`;
         break;
     }

   },
    operate:      function (req) {
      return new sortOn(req);
    },
    build:        function (string,operateType,sortType) {
       let arrayString = string.split(",");
       let reconstructedString = "";
        arrayString.forEach((element)=>{

           reconstructedString += `${reconstructedString!==""?" OR ":""}`+ sortType + " "+ operateType + " "+element;
       });
      return reconstructedString;
    }
  }

  objects.queryFilter = objects.queryFilter.bind(objects);
  objects.translate   = objects.translate.bind(objects);

  return objects;
}
