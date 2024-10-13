const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.post("/utilisateurs/add_avant_post/by_user",multer,async(req,res)=>{
        let body = JSON.parse(req.body.body)
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.about_all_road},{name : "presentation_image",value : req.file},{name : "prix", value : body.price},{name : "dificulter",value : body.difficulty},{name : "period", value : body.period},{name : "confort",value : body.confort}]
        for(let i of tableau){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
        parent_road_model.find({name : btoa(tableau[0].value)}).then(async(a)=>{
            if(a.length !== 0) {
                const message = "Veuillez utiliser un autre nom"
                return res.status(400).json({message})
            }
            else {
                console.log("https://web.caponmada.com/get/" + req.file.filename)
              const name_file =  req.file.originalname.split(" ").join("_")
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : btoa(tableau[0].value),
                about_all_road : btoa(tableau[1].value),
                presentation_image : "https://web.caponmada.com/get/" + name_file.toString(),
                confort : btoa(tableau[6].value),
                price : btoa(tableau[3].value),
                difficulty : btoa(tableau[4].value),
                period : tableau[5].value
            }).then((_)=>{
                const message = "Votre circuit mêre a été enregistrer avec succès"
                return res.json({message})
            })
        }  
    })
} catch (error) {
    const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
    return res.status(500).json({message,error})
}
})}
