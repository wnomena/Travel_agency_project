const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const member = new Member()
        data = {
            name : req.body.name,
            password : req.body.password,
            mail : req.body.mail,
        }
        member.getById(data.mail,function (err,result) {
            result.forEach(element => {
                if(element.mail == data.mail) {
                    return res.status(400).json({message : "email already used"})
                }
            });
            member.insert(data,function (err,resp) {
                if(!err) {
                    return res.json({message : "Subscription done"})
                }
            })
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}