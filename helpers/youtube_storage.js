let youtube =   require('../vendors/youtube');

module.exports = class Youtube {

    constructor (opts){
        this.mimeType   = opts.mimeType
        this.parameters = opts.parameters;
    }



    _handleFile(req,file,cb){
        this.parameters(req,file, (err,reqBody)=> {

            let media = {
                mimeType    :   this.mimeType,
                body        :   file.stream
            };

            new youtube(
                {
                    client_secret:process.env.CLIENT_SECRET,
                    oauth_token  :process.env.OAUTH_TOKEN
                }
            ).then((authKey)=>{
                    return youtube.uploadVideo(authKey,reqBody,media);
            }).then((res)=>{
                console.log(res,'this is here')
                cb(null,{
                    path:res
                })
            }).catch((err)=>{
                console.log(err);
                cb(err);
            })
        })

    }

    _removeFile(req,files,cb){
        cb();
    }

}



