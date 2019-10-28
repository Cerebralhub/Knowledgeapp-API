
let fs          = require('fs');
let readline    = require('readline');
let {google}    = require('googleapis');
let OAuth2      = google.auth.OAuth2;
let SCOPES      = ['https://www.googleapis.com/auth/youtube.readonly'];
let TOKEN_DIR   = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
let TOKEN_PATH  = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

let apiKey      = process.env.YOUTUBE_KEY;

let service     = google.youtube({
                                    version:'v3',
                                    auth:apiKey
                                });


module.exports = class Youtube {


     init (scope) {

        fs.readFile('google_client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                return;
            }
            // Authorize a client with the loaded credentials, then call the YouTube API.
            this[authorize](JSON.parse(content));
        });


    }
     //
     // [authorize](token){
     //
     //     let clientSecret   = credentials.installed.client_secret;
     //     let clientId       = credentials.installed.client_id;
     //     let redirectUrl    = credentials.installed.redirect_uris[0];
     //     let oauth2Client   = new OAuth2(clientId, clientSecret, redirectUrl);
     //
     //     // Check if we have previously stored a token.
     //     fs.readFile(TOKEN_PATH, function(err, token) {
     //         if (err) {
     //             this[getNewToken](oauth2Client, callback);
     //         } else {
     //             oauth2Client.credentials = JSON.parse(token);
     //             callback(oauth2Client);
     //         }
     //     });
     //
     // }
     //
     // [getNewToken] (){
     //
     //     let authUrl = oauth2Client.generateAuthUrl({
     //         access_type: 'offline',
     //         scope: SCOPES
     //     });
     //     console.log('Authorize this app by visiting this url: ', authUrl);
     //     let rl      = readline.createInterface({
     //         input  : process.stdin,
     //         output : process.stdout
     //     });
     //     rl.question('Enter the code from that page here: ', function(code) {
     //         rl.close();
     //         oauth2Client.getToken(code, function(err, token) {
     //             if (err) {
     //                 console.log('Error while trying to retrieve access token', err);
     //                 return;
     //             }
     //             oauth2Client.credentials = token;
     //             storeToken(token);
     //             callback(oauth2Client);
     //         });
     //     });
     // }

      getVideo(videoId){
        return new Promise((resolve, reject) =>{
            service.videos.list({
                auth: apiKey,

            },function (err,response) {

            })
        })
     }

    static uploadVideo(requestBody,media){
        return new Promise((resolve,reject)=>{
            service.vidoes.create({

                params:{
                    part:'fileDetails,snippet',
                    notifySubscribers:true,
                    stabilize:true
                },
                requestBody,
                media
            },function (err,response) {
                if (err){reject(err)}else{
                    resolve(resolve)
                }
            })
        })
     }

}
