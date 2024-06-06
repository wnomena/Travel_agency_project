module.exports = (app,parent_road_model) =>{
    app.post("/utilisateurs/add_avant_post/by_user",async(req,res)=>{
        const tableau = [{name : "name",value : req.body.name},{name : "about_all_road",value : req.body.about_all_road},{name : "presentation_image",value : req.body.presentation_image}]
        for(let i of tableau){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : btoa(tableau[0].value),
                about_all_road : btoa(tableau[1].value),
                presentation_image : await require("../convert_image_to_string")(tableau[2].value)
            }).then((_)=>{
                const message = "Votre circuit mêre a été enregistrer avec succès"
                return res.json({message})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
            return res.status(500).json({message,error})
        }
    })
}