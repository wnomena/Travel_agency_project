const parent = require("../bd/mysql/childRoad/childModel")
const split_join = require("../function_reutiliser/convertsppit")
module.exports = async (req,res) => {
        try {
        const body = req.body
        console.log(JSON.parse(body.body))
        const tableau = [{name : "id",value : body.id},{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty},{name : "distance", value : body.distance},{name : "sejours_delay", value : `${body.sejours_delay_B} ${body.sejours_delay_E}`}, {name : "confort", value : body.confort},{name : "parent_id",value : body.parent_id}]
        const data = async () => {
            return {
                id : arr[0].value,
                name : arr[1].value,
                description : arr[2].value,
                presentation_image : arr[3].value,
                price : arr[4].value,
                period : arr[5].value,
                difficulty : arr[6].value,
                distance : arr[7].value,
                sejours_delay : arr[8].value,
                confort  : arr[9].value,
                parent_id : arr[10].value
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
