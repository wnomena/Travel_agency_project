const { contact_model } = require("./bd/schema/contact_schema")

module.exports = (req,res) => {
    try {
        contact_model.find({name : req.params.name}).then((respp) => {
            if(respp.length !== 0) {
                res.json({data : [...respp]})
            } else {
                contact_model.find().then((resp) => {
                    res.json({data : [...resp]})
                })
            }
        })
    } catch (error) {
        res.status(500).json({err : error})
    }
}