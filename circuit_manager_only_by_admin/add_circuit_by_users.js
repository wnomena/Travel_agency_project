
const multer = require("../multer_middleware")
const url = require("../url")
const split_join = require("../function_reutiliser/convertsppit")
module.exports = (app,parent_road_model) =>{
    app.post("/utilisateurs/add_avant_post/by_user",multer,async(req,res)=>{
        try {
        console.log(url)
        let body = req.body
        console.log(body)
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "dificulter",value : body.difficulty},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "confort",value : body.confort}]
        for(let i of tableau){
             console.log(i)
            if(i.value == "" || i.value == undefined){
                const message = `Required field ${i.name}`
                return res.status(400).json({message})
            }
        }
        
        parent_road_model.find({name : btoa(tableau[0].value)}).then(async(a)=>{
            if(a.length !== 0) {
                const message = "Use other name"
                return res.status(400).json({message})
            }
            else {
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : btoa(tableau[0].value),
                description : btoa(tableau[1].value),
                presentation_image : await split_join(tableau[2].value) ,
                confort : btoa(tableau[6].value),
                price : btoa(tableau[3].value),
                difficulty : btoa(tableau[4].value),
                period : btoa(tableau[5].value)
            }).then((_)=>{
                const message = "Action done"
                return res.json({message})
            })
        }  
    })
} catch (error) {
    const message = "Server crached"
    return res.status(500).json({message,error})
}
})}
