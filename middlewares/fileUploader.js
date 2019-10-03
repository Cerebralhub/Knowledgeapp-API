let fs = require("fs");

module.exports = class fileUploader {
  constructor(req,options){
    this.files = req.files;
    this.fileName;
    this.filePath;
  }

  rename(name){
    this.fileName = name;
  }
  saveTo(path){
    this.filePath = path;
  }
  upload(){
    fs.readFile()
  }
}