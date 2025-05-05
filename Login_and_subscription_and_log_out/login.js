const { forceInt } = require("../bd/mysql/fonctionType")
const {User} = require("../bd/mysql/user/modelUserAndMember")
const addToken = require("../cookies/addToken")
const { setCookies } = require("../cookies/private")
module.exports = function (req,res) {
    try {
        const user = new User()
        const data = {
            mail : req.body.mail,
            password : req.body.password
        }
        console.log(data)
        user.getById(data.mail,function (error,result) {
            if(forceInt(result.length)) result.forEach(element => {
                if(element.password == data.password) {
                    return res.json({message : "Connection done",token: addToken(req)})
                } else return res.status(401).json({message : "Connection failed"})
            });
            else return res.status(400).json({message : "Use another mail"})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}