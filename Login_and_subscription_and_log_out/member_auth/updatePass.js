const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const data = {
            mail : req.body.mail,
            password : req.body.password,
            new : req.body.new
        }
        const member = new Member()
        member.getById(data.mail,function(error,result) {
            if(error) {
                return res.status(400).json({message : "Bad request"})
            } else {
                result.forEach(element => {
                    if(element.password == data.password) {
                        member.update({id : element.id,password : data.new},function (err,resp) {
                            if(err) {
                                return res.status(400).json({message : "Bad request"})
                            } else {
                                return res.json({message : "Password updated"})
                            }
                        })
                    }
                });
                return res.status(400).json({message : "Wrong password"})
            }
        })
    } catch (error) {
        
    }
}