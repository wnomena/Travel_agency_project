const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.post("/utilisateurs/add_avant_post/by_user", multer,async(req,res)=>{
        let body = JSON.parse(req.body.body)
        console.log(req.body)
        const tableau = [{name : "name",value : body.name},{name : "about_all_road",value : body.about_all_road},{name : "presentation_image",value : req.file},{name :"price",value : body.price},{name : "period",value : body.period},{name : "difficulty",value : body.difficulty},{name : "confort",value : body.confort}]
        for(let i of tableau){
            console.log(i)
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
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : btoa(tableau[0].value),
                about_all_road : btoa(tableau[1].value),
                presentation_image : `http://localhost:5000/get/${req.file.filename.toString()}`,
                price : btoa(tableau[3].value),
                period : btoa(tableau[4].value),
                difficulty : btoa(tableau[5].value),
                confort : btoa(tableau[6].value)
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