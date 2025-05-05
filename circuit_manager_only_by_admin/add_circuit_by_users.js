const parent = require("../bd/mysql/parentRoad/modelParentRoad")
const split_join = require("../function_reutiliser/convertsppit")
module.exports = async (req,res) => {
        try {
        const body = req.body
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "dificulter",value : body.difficulty},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "confort",value : body.confort}]
        const data = async () => {
            return {
                name : tableau[0].value,
                description : tableau[1].value,
                presentation_image : await split_join(tableau[2].value),
                confort : tableau[6].value,
                price : tableau[3].value,
                difficulty : tableau[4].value,
                period : tableau[5].value
            }
        }
        const Parent = new parent()
        for(let i of tableau){
             console.log(i)
            if(i.value == "" || i.value == undefined){
                const message = `Required field ${i.name}`
                return res.status(400).json({message})
            }
        }
        Parent.insert(await data(),(error) => {
            if(error) {
                const message = "Bad request 400"
                return res.status(400).json(message)
            } else {
                return res.json({message : "Action done"})
            }
        })       
} catch (error) {
    console.log(error)
    const message = "Server crached"
    return res.status(500).json({message,error})
}
}
