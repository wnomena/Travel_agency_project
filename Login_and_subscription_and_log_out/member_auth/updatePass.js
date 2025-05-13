const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {   
        const data = {
            mail : req.body.mail,
            password : req.body.password,
            new : req.body.new,
            confirm : req.body.confirmNewPass
        }
        const member = new Member()
        console.log(data)
        if(data.new == data.confirm) {
            member.update(data,function (err,res) {
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
            return res.status(400).json({message : "Passwords not identical"})
        }
    } catch (error) {
        return res.status(500).json({message : "Server Crached"})
    }
}