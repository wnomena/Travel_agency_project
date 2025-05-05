const {Member} = require("../../bd/mysql/user/modelUserAndMember")
module.exports = (req,res) => {
    try{
        const member = new Member()
        member.getAll(function(error,result) {
            if(result) {
                const table = []
                result.forEach(element => {
                    table.push({
                        id : element.id,
                        mail : element.mail,
                        name : element.name
                    })
                });
                return res.json({data : table})
            }
        })
    }catch(error) {
        return res.status(500).json({message : "Server crached"})
    }
}