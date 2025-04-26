const contact = require("./bd/mysql/contact/contactModel")

module.exports = (req,res) => {
    try {
        const Contact = new contact()
        const table = []
        Contact.getById(req.params.id,function (error,result) {
            result.forEach(element => {
                table.push({
                    id : element.id,
                    name : element.name,
                    mail : element.mail,
                    object : element.object,
                    corps : element.corps
                })
            });
            Contact.update(table[0],function (err,result) {
                console.log(result)
            })
            return res.json({data : table})
        })
    } catch (error) {
        res.status(500).json({message : "Server crached"})
    }
}