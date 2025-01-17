const multer = require("../multer_middleware")
const { url } = require("../url")
module.exports = (app,child_road_model,parent_road_model) =>{
    app.post("/utilisateurs/add_unders/circuit/by_users",multer,(req,res)=>{
        console.log(req.file)
        let body = req.body
        const array_list = [{name : "parent_ident_equal_to_child",value : body.parent_ident_equal_to_child},{name : "name",value : body.name},{name : "description",value : body.description},{name : "distance",value : body.distance},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "sejour_delay",value : `${body.sejours_delais_B} ${body.sejours_delais_E}`},{name : "price", value : body.price},{name : "difficulte",value : body.difficulty},{name : "confort", value : body.confort},{name : "period",value : `${body.period_B} ${body.period_E}`}]
        for(let i of array_list){
            console.log(i)
            if(i.value == "" || i.value == undefined){
                console.log(i)
                const message = "Required field"
                return res.status(400).json({message})
            }
        }
        try {
            parent_road_model.find({identifiant : array_list[0].value}).then(async(a)=>{
                if(a.length == 0){
                    const message = "Non-existent data"
                    return res.status(400).json({message})
                }else{
                    await child_road_model.find({name : btoa(array_list[1].value)}).then(async(c)=>{
                        if(c.length == 0){
                            child_road_model.create({
                                parent_ident_equal_to_child : array_list[0].value,
                                name : btoa(array_list[1].value),
                                description : btoa(array_list[2].value),
                                distance : btoa(array_list[3].value),
                                presentation_image : await require("../function_reutiliser/convertsppit")(array_list[4].value),
                                sejour_delay : btoa(array_list[5].value),
                                price : btoa(array_list[6].value),
                                difficulty : btoa(array_list[7].value),
                                confort : btoa(array_list[8].value),
                                period : btoa(array_list[9].value)
                            }).then((b)=>{
                                const message = "Action done"
                                return res.json({message})
                            })
                        }else{
                            const message = "Use other name"
                            return res.status(400).json({message})
                        }
                    })
                }
            })
        } catch (error) {
            const message = "Server crached"
            return res.status(500).json({message,error})
        }
    })
}
//fonctionnel
// parser misy olana