const { contact_model } = require("./bd/schema/contact_schema")

module.exports = (req,res) => {
    try {
        contact_model.find({_id : req.params.name}).then((value) => {
            console.log(value)
            contact_model.findByIdAndUpdate(value[0]._id,{seen : true}).then((re) => {
                console.log(re)
                const message = "Form updated"
                res.json({message})
            })
        })
    } catch (error) {
        res.status(500).json({message : JSON.stringify(error)})
    }
}