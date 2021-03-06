const multer = require('multer');
const path = require('path');
// const upload  = require('../utils/upload')

const pathToOriginal = path.join(__dirname, '../public/images/originals/') //where we want to save it 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathToOriginal)
    },
    filename: function (req, file, cb) {
        console.log(file)
        const allow = "image/jpg, image/gif, image/png"
        if (allow.includes(file.mimetype)) {
            return cb(new Error("File Not Supported", undefined))
        }
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var upload = multer({ storage: storage })



module.exports = upload.single("fileupload")