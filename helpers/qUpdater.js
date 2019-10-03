let mysql = require("mysql");

module.exports = function () {

  return function update(table) {

      return new UpdateObj(table);
    }


};

class UpdateObj {
  constructor(table){
    this.string = "UPDATE "+table+" SET ";
    this.builder = [];
    return this;
  }
  field(columnName,fieldValue){
    fieldValue?this.builder.push(columnName+"="+mysql.escape(fieldValue)):"";
    return this;
  }

  done(){
    this.builder.forEach((value,index)=>{
      this.string += value+(index === (this.builder.length - 1)?"":",");
    });
    return this.string;
  }
}