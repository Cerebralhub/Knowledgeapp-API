var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

let apiKey      = process.env.YOUTUBE_KEY;

function authorize(credentials, resolve,reject,opts) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(opts.oauth_token, function(err, token) {
        if (err) {
           reject('Error loading token file: ' + err)
        } else {
            oauth2Client.credentials = JSON.parse(token);
            resolve(oauth2Client);
        }
    });
}

module.exports = class Youtube {

        constructor(opts){

            if (!opts.client_secret) throw 'supplied client secret path invalid';
            if (!opts.oauth_token) throw 'supplied auth token secret path invalid';

            return    this.init(opts);

        }


     init (opts) {
       return new Promise((resolve,reject)=>{
            fs.readFile(opts.client_secret,  (err, content)=> {
                if (err) {

                    console.log('Error loading client secret file: ' + err);
                    reject('Error loading client secret file: ' + err);
                    return;
                }
                // Authorize a client with the loaded credentials, then call the YouTube API.
                return authorize(JSON.parse(content),resolve,reject,opts);
            });
        })


     }



    static  getVideo(videoId){
        return new Promise((resolve, reject) =>{
            service.videos.list({
                auth: apiKey,

            },function (err,response) {

            })
        })
     }

    static uploadVideo(authKey,requestBody,media){
        console.log('uploading video....');
        return new Promise((resolve,reject)=>{
            let service     = google.youtube({
                version:'v3',
                auth:authKey
            });
            service.videos.insert({

                    part:'snippet',
                    notifySubscribers:true,
                    stabilize:true,
                    requestBody,
                    media

            },function (err,response) {
                if (err){reject(err)}else{
                    resolve(response);
                }
            })
        })
     }

};
