const parent = require("../bd/mysql/childRoad/childModel")
const split_join = require("../function_reutiliser/convertsppit")
module.exports = async (req,res) => {
        try {
        const body = req.body
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.files ? req.files[0].filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty},{name : "distance", value : body.distance},{name : "sejours_delay", value : `${body.sejours_delais_B} ${body.sejours_delais_E}`}, {name : "confort", value : body.confort},{name : "parent_id",value : body.parent_id},{name : "carte", value : req.files ? req.files[1].filename : undefined}]
        console.log(req.files)
        const data = async () => {
            return {
                name : tableau[1 - 1].value,
                description : tableau[2 - 1].value,
                presentation_image : await split_join(tableau[3 - 1].value),
                price : tableau[4 - 1].value,
                period : tableau[5 - 1].value,
                difficulty : tableau[6 - 1].value,
                distance : tableau[7 - 1].value,
                sejours_delay : tableau[8 - 1].value,
                confort  : tableau[9 - 1].value,
                parent_id : tableau[10 - 1].value,
                carte : split_join(tableau[11 - 1].value)
            }   
        }
        const Parent = new parent()
        for(let i of tableau){
             console.log(i)
            if(i.value == "" || i.value == undefined){
                const message = `Required field ${i.name}`
                return res.status(400).json({message})
            } else if(i.name == "about_all_road" &&  i.value.length < 300) {
                return res.status(400).json({message : "Put more Description"})
            }
        }
        Parent.insert(await data(),(error) => {
            if(error) {
                console.log(error)
                const message = "Bad request 400"
                return res.status(400).json({message})
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
