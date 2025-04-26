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
            result.forEach(element => {
                if(element.password == data.password) {
                    addToken(req)
                    return res.json({code : 1,message : "Connection done"})
                } else if(element.password == data.password && data.password == `Caponmada.com${new Date().getFullYear()}`) {
                    return res.json({code : 0,message : "Update required"})
                }
            });
            return res.status(401).json({code : -1, message : "Connection failed"})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}