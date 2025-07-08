const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const member = new Member()
        member.delete(req.params.id,function (error,resp) {
            if(!error) {
                return res.json({message : "Action done"})
            } else {
                return res.status(400).json({message : "Bad request"})
            }
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}