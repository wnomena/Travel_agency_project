const { contact_model } = require("./bd/schema/contact_schema")

module.exports = (req,res) => {
    try {
        contact_model.find({name : req.body.name}).then((value) => {
            contact_model.findByIdAndUpdate(value._id,{seen : true}).then((re) => {
                const message = "Form updated"
                res.json({message})
            })
        })
    } catch (error) {
        res.status(500).json({message : JSON.stringify(error)})
    }
}