const { contact_model } = require("./bd/schema/contact_schema")

module.exports = (req,res) => {
    try {
        contact_model.find({name : req.body.name}).then((value) => {
            contact_model.findByIdAndUpdate(value._id,{seen : true}).then((re) => {
                res.json({message : re})
            })
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
}