let youtube =   require('../vendors/youtube');

module.exports = class Youtube {

    constructor (opts){

        this.reqBody        =  opts.requestBody;
        this.mimeType       =  opts.mimeType;
    }



    _handleFile(req,file,cb){

        let media = {
            mimeType    :   this.mimeType,
            body        :   file.stream
        };

        new youtube(
            {
                client_secret:process.env.CLIENT_SECRET,
                oauth_token  :process.env.OAUTH_TOKEN
            }
        )
            .then((authKey)=>{
          return youtube.uploadVideo(authKey,this.reqBody,media);
        }).then((res)=>{
           cb(null,{
               path:res,

           }).catch((err)=>{
               cb(err);
           })
        });

    }

    _removeFile(req,files,cb){
        cb();
    }

}



