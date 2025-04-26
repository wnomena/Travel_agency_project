const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const user = new Member()
        const data = {
            mail : req.body.mail,
            password : req.body.password
        }
        user.getById(data.mail,function (error,result) {
            result.forEach(element => {
                if(element.password == data.password) {
                    return res.json({message : "Connection done"})
                }
            });
            return res.status(401).json({message : "Connection failed"})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}