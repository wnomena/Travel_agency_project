const { contact_model } = require("./bd/schema/contact_schema")
const multer = require("./multer_middleware")
module.exports = (req,res) => {
    console.log(req.body.mail)
    try {
        contact_model.create({
            name : req.body.name,
            mail : req.body.mail,
            object : req.body.object,
            corps : req.body.corps,
            seen : false
        }).then((response) => {
            res.json({message : "Request sent"})
        })
    } catch (error) {
        res.status(500).json({message : "server crached, please try later"})
}}
//tandremana le données vide