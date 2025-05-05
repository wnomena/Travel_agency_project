const { config } = require("../../bd/mysql/fonctionType")
const { forceInt } = require("../../bd/mysql/fonctionType")
const { Member } = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        console.log(config.KEY)
        const user = new Member()
        const data = {
            mail : req.body.mail,
            password : req.body.password
        }
        user.getById(data.mail,function (error,result) {
            if(forceInt(result.length)) result.forEach(element => {
                if(element.password == data.password) {
                    return res.json({message : "Connection done"})
                } else return res.status(401).json({message : "Connection failed"})
            });
            else return res.status(400).json({message : "Use another mail"})
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Server crached"})
    }
}