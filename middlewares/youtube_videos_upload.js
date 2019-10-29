let multer                     = require('multer');
let YoutubeStorage             = require('../helpers/youtube_storage');

module.exports = function (opts) {



    return function (req,res,next) {
        let youtubeUpload              = multer({
            storage:  YoutubeStorage()
        }).single('video');
    }

}