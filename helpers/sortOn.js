module.exports = class sortOn {
  constructor(req){
    this.string   = [];
    this.query    = req.query;
    this.params   = req.params;
    return this;
  }

  on(query,alias){



    this.query[query]?this.string.push(alias?this.query[query].replace(new RegExp(query,'gi'),alias):this.query[query]):"";
   return this;
  }
  onParam(query,alias){
    this.params[query]?this.string.push(alias?alias+"="+this.params[query].replace(query,alias):query +"="+this.params[query]):"";
    return this;
  }
  done(){
    let reConstructed = "";
    this.string.forEach(function (string,index) {
      reConstructed += (index !== 0?" AND ":" WHERE ") + string;
    });
    return reConstructed;
  }
}