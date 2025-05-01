const {User} = require("../bd/mysql/user/modelUserAndMember")
const addToken = require("../cookies/addToken")
module.exports = function (req,res) {
    try {
        const user = new User()
        const data = {
            mail : req.body.mail,
            password : req.body.password
        }
        user.getById(data.mail,function (error,result) {
            console.log(error)
            if(result.length !== 0) result.forEach(element => {
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