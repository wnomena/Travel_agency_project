const { contact_model } = require("./bd/schema/contact_schema")
const multer = require("./multer_middleware")
const { main } = require("./sendmail")
module.exports = (req,res) => {
  
    try {
        console.log(req.body)
        main(req.body.name,req.body.mail,req.body.object,req.body.corps,"jsdev.web2@gmail.com")
            res.json({message : "Request sent"})

    } catch (error) {
        res.status(500).json({message : "server crached, please try later"})
}}
//tandremana le données vide