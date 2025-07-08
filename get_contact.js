const contact = require("./bd/mysql/contact/contactModel")

module.exports = (req,res) => {
    try {
        const Contact = new contact()
        const table = []
        Contact.getAll(function (error,result) {
            result.forEach(element => {
                table.push({
                    id : element.id,
                    name : element.name,
                    mail : element.mail,
                    object : element.object,
                    corps : element.corps,
                    vue : element.vue
                })
            });
            return res.json({data : table})
        })
    } catch (error) {
        res.status(500).json({message : "Server crached"})
    }
}