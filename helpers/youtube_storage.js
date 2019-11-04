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
                req.youtube_response = res;
                cb(null,{
                    path:res.data
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



