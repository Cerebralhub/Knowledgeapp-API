// let youtube =   require('../vendors/youtube');
//
// module.exports = class Youtube {
//
//     constructor (opts){
//
//         this.reqBody        =  opts.requestBody;
//         this.mimeType       =  opts.mimeType;
//     }
//
//
//
//     _handleFile(req,file,cb){
//
//         let media = {
//             mimeType    :   this.mimeType,
//             body        :   file.stream
//         };
//         console.log('this is handle file being called');
//         youtube.uploadVideo(this.reqBody,media).then((res)=>{
//            cb(null,{
//                path:res,
//
//            }).catch((err)=>{
//                cb(err);
//            })
//         });
//     }
//
//     _removeFile(req,files,cb){
//         cb();
//     }
//
// }

var fs = require('fs')

function getDestination (req, file, cb) {
    console.log('hey i am here')
    cb(null, '/dev/null')
}

function MyCustomStorage (opts) {
    console.log('thisssss');
    this.getDestination =  getDestination
}

MyCustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
    this.getDestination(req, file, function (err, path) {
        console.log('this is happening here')
        if (err) return cb(err)

        var outStream = fs.createWriteStream(path)

        file.stream.pipe(outStream)
        outStream.on('error', cb)
        outStream.on('finish', function () {
            cb(null, {
                path: path,
                size: outStream.bytesWritten
            })
        })
    })
}

MyCustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {
    fs.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new MyCustomStorage(opts)
}