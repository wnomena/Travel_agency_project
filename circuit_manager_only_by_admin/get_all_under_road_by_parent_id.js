const child = require("../bd/mysql/childRoad/childModel")
module.exports = (req,res) => {
    try {
        const Child = new child()
        const value = []
        console.log(typeof req.params)
        Child.getAll(req.params.parent,(error,result) => {
            if(result) {
                result.forEach(element => {
                    value.push({
                        id : element.id,
                        parent_id : element.parent_id,
                        name : element.name,
                        description : element.description,
                        presentation_image : element.presentation_image,
                        price : element.price,
                        distance : element.distance,
                        sejours_delay : element.sejours_delay,
                        confort : element.confort,
                        carte : element.carte
                    })
                });
                console.log(result)
                return res.json({data : value})
            } else if(error) {
                return res.status(400).json({message : "Bad request"})
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Server crached"})
    }
} 