const { contact_model } = require("./bd/schema/contact_schema")

module.exports = (req,res) => {
    try {
        contact_model.find().then((respp) => {
            for(let i of respp) {
                if(i._id == req.params.name.toString()) return res.json({data : [i]})
            }
        return res.json({data : [...respp]})
        })
    } catch (error) {
        res.status(500).json({err : error})
    }
}