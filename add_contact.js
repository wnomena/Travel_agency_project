const contact = require("./bd/mysql/contact/contactModel")
const { main } = require("./sendmail")
module.exports = (req,res) => {
    console.log(req.body.mail)
    // main(req.body.name,req.body.mail,req.body.object,req.body.corps,"sandaarnaud@gmail.com")
    try {
        const Contact = new contact()
        const data = {
            name : req.body.name,
            mail : req.body.mail,
            object : req.body.object,
            corps : req.body.corps,
            vue : false
        }

        Contact.insert(data,function (err,result) {
            console.log(err,result)
            if(result) {
                return res.json({message : "Request sent"})
            } else {
                console.log(err)
                return res.status(400).json({message : "Request already sent"})
            }
        })
    } catch (error) {
        res.status(500).json({message : "Server crached"})
}}
//tandremana le données vide