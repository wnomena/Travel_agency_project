
const multer = require("../multer_middleware")
const url = require("../url")
module.exports = (app,parent_road_model) =>{
    app.post("/utilisateurs/add_avant_post/by_user",multer,async(req,res)=>{
        let body = req.body
        console.log(body)
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file},{name : "prix", value : body.price},{name : "dificulter",value : body.difficulty},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "confort",value : body.confort}]
        for(let i of tableau){
             console.log(i)
            if(i.value == "" || i.value == undefined){
                const message = "Required field"
                return res.status(400).json({message})
            }
        }
        try {
        parent_road_model.find({name : btoa(tableau[0].value)}).then(async(a)=>{
            if(a.length !== 0) {
                const message = "Use other name"
                return res.status(400).json({message})
            }
            else {
                console.log(url + req.file.filename)
              const name_file =  req.file.originalname.split(" ").join("_")
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : btoa(tableau[0].value),
                about_all_road : btoa(tableau[1].value),
                presentation_image : url + "/" + name_file.toString(),
                confort : btoa(tableau[6].value),
                price : btoa(tableau[3].value),
                difficulty : btoa(tableau[4].value),
                period : tableau[5].value
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
