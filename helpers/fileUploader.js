let fs = require('fs');
let path = require('path');
module.exports = class fileUploader {
  constructor(input,options){
    this.input        = input;
    this.tempPath   = this.input.path;
    this.getTempFileName();

  }

  saveTo(savetoPath){
    this.saveToPath = path?path.join('static',savetoPath,'/'):path.join('static','/');
    return this
  }

  saveAs(name){
    this.fileName = name;
    return this;
  }

  getTempFileName(){
    // let reg = /^.*\\(.*(?=\.[a-z]))\.([a-z]+)/;
    let pathExplode = path.parse(this.tempPath)
    this.tempFileName   = pathExplode.name;
    this.fileExtension  = pathExplode.ext;

  }

   makeId(length = 10) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  upload(){
    let saveToPath = this.saveToPath||'static';
    this.saveToPath = path.normalize(saveToPath);
    let fileName = this.fileName||this.makeId();
    let joinedPath = path.join(saveToPath,fileName+this.fileExtension);
    //remove the static keyword from the url
    let reg = /^static\\|static\//;


    return new Promise((resolve,reject)=>{
      this.folderExists().then(()=>{
        return this.fileExist(joinedPath);
      }).then((resolvedPath)=>{
        fs.copyFile(this.tempPath,resolvedPath,(err)=>{
          if (err) reject(err);
          resolve(resolvedPath.replace(reg,""));

        })
      }).catch((error)=>{console.log(error)});
    })
  }

  folderExists(){
    return new Promise((resolve,reject)=>{

      fs.access(this.saveToPath, fs.constants.F_OK, (err) => {
        if (err){
          //create directory
          fs.mkdir(this.saveToPath, { recursive: true }, (err) => {
            if (err){
              reject(err);
            }
            resolve(path.join('..',this.saveToPath));
          });
        }else{
          resolve(path.join('..',this.saveToPath));
        }
      });

    })
  }

  fileExist(path){
    // Check if the file exists in the current directory.
    return new Promise((resolve,reject)=>{
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err){
          resolve(path);
        }else{

          let saveToPath = this.saveToPath||'static';
          let fileName = this.fileName||this.makeId();
          let joinedPath = path.join(saveToPath,fileName+this.fileExtension);

          return this.fileExist(joinedPath);

        }
      });

    })
  }


}