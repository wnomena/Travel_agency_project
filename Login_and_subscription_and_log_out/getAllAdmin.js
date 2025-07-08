const  {User} = require("../bd/mysql/user/modelUserAndMember")
module.exports = function (req,res) {
    try {
        const user = new User()
        user.getAll(function (err,reust) {
            const data = []
            reust.forEach(element => {
                data.push({
                    id: element.id,
                    mail : element.mail,
                    name : element.name
                })
            });
            return res.json({data : data})
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}