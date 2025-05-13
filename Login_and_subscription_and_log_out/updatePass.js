const { forceInt } = require("../bd/mysql/fonctionType")
const {User} = require("../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {   
        const data = {
            mail : req.body.mail,
            password : req.body.password,
            new : req.body.new,
            confirm : req.body.confirmNewPass
        }
        const member = new User()
        console.log("data")
        if(data.new == data.confirm) {
            member.update(data,function (err,res) {
                console.log(err,res)
                if(err == "wrong password") {
                    return res.status(400).json({message : err})
                } if(err !== "wrong password") {
                    console.log(err)
                    return res.status(400).json({message : err})
                } else if(res) {
                    return res.status(200)
                }
            })
        } else {
            console.log("tsy mety ngamba le gestion d'erreur")
            return res.status(400).json({message : "Passwords not identical"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Server Crached"})
    }
}