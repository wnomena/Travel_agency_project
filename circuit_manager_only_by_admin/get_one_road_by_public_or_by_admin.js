const child = require("../bd/mysql/childRoad/childModel")
module.exports = (req,res) => {
    try {
        const Child = new child()
        const value = []
        Child.getById(req.params.id,(error,result) => {
            console.log("requete enffant")
            if(result) {
                result.forEach(element => {
                    console.log(element)
                    value.push({
                        id : element.id,
                        parent_id : element.parent_id,
                        name : element.name,
                        description : element.description,
                        presentation_image : url + element.presentation_image,
                        price : element.price,
                        distance : element.distance,
                        sejour_delay : element.sejour_delay,
                        confort : element.confort,
                        period : element.period,
                        difficulty : element.difficulty,
                        carte : element.carte
                    })
                });
                return res.json({data : value})
            } else if(error) {
                return res.status(400).json({message : "Bad request"})
            }
        })
    } catch (error) {
        return res.status(500).json({message : "Server crached"})
    }
}