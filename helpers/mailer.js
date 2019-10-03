let nodemailer = require("nodemailer");
let mailConfig = require('../config/mail');
module.exports = class mailer {
  constructor(){
    this.html;
    this.text;
    this.from;
    this.to;
    this.subject;
    this.config = mailConfig.connection;
    this.connect(this.config);

  }

  html(html){
     typeof html === 'string'?this.html = html:undefined;
    return this;
  }
  text(text){
    typeof text === 'string'?this.text = text:undefined;
    return this;
  }

  recipient(address){
   this.to = address;
    return this;
  }
  subject(subject){
    this.subject = subject||"Easycow Email";
    return this;
  }

  config(config){
    typeof config === 'object'?this.config = config:this.config = mailConfig.connection;
    return this;
  }

  connect(config){
    this.mailConnection = nodemailer.createTransport(typeof config === "object"?config:this.config);
    return this;
  }

  sender(text){
    typeof text === 'string'?this.from = text:undefined;
    return this;
  }

  send(message,retry,retries = 0){
    console.log(retries,'retries');
    let defaultMessage = {};
    defaultMessage.to = this.to||'';
    defaultMessage.from = this.from||mailConfig.message.from;
    defaultMessage.subject = this.subject;
    defaultMessage.html = (this.html !== 'undefined'?this.html:message);

   return new Promise( (resolve,reject) => {
     console.log("sending mail...")
      this.mailConnection.sendMail(defaultMessage).then(function (result) {
        console.log("mail sent")
        resolve(result);
      }).catch( (error)=> {
        if (retry !== 'undefined' && retries <= retry  ){
          retries++;
          console.log('retrying..');
          this.send(message,retry,retries);
        }else{
          console.log(error)
          reject(error);
        }
      })
    })
  }



}