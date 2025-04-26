const {User} = require("../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const user = new User()
        const data = {
            usermail : req.body.usermail,
            mail : req.body.mail,
            name :  req.body.name,
            password : `Caponmada.com${new Date().getFullYear()}`
        }
        user.getById(data.usermail,function (error,result) {
            result.forEach(element => {
                if(element) {
                    user.insert(data,function (err,resp) {
                        if(err) {
                            return res.status(400).json({message : "Bad request"})
                        } else {
                            return res.json({message : "New user added"})
                        }
                    })
                }
            });
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}