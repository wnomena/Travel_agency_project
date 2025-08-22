const parent = require("../bd/mysql/parentRoad/modelParentRoad")
const unlink_function = require("../unlink_function")
module.exports = (req,res) => {
    try {
        const Parent = new parent()
        Parent.getById(req.params.id,function (error,result) {
            if(error) {
                return res.status(400).json({message : "Bad request"})
            } else {
                console.log(req.params.id)
                Parent.delete(req.params.id,async function (error2,result2) {
                        const link = result[0].presentation_image
                        await unlink_function(link)
                        return res.json({message : "Action done"})
                })
            }
        })
    } catch (error) {
        const message = "Server crached"
        return res.status(500).json(message)
    }
}