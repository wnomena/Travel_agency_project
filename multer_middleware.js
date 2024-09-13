const multer = require("multer")
const MIME_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png",
    "image/gif" : "gif",
    
}
const storage = multer.diskStorage({
    destination : "./file",
    filename : function(req, file, cb) {
        console.log(file)
        let name = file.originalname.split(" ").join("_")
        console.log(name)
      cb(null,name);
    }
})
module.exports = multer({storage}).single("image")
