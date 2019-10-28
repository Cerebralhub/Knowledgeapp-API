let multer                     = require('multer');
let YoutubeStorage             = require('../helpers/youtube_storage');

module.exports = function (opts) {



    return function (req,res,next) {
        let youtubeUpload              = multer({
            storage: new YoutubeStorage({
                reqBody:{
                    snippet:{
                        title   :req.body.title,
                        tags    :req.body.tags,
                    },
                    status:{

                        license             :req.body.license,
                        privacyStatus       :req.body.privacyStatus,
                        publicStatsViewable :false

                    }
                },
                mimeType:'video/*'
            })
        }).single('video');
    }

}