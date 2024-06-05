module.exports = (app,parent_road_model) =>{
    app.post("utilisateurs/add_avant_post/by_user",async(req,res)=>{
        const tableau = [{name : "name",value : req.body.name},{name : "number_way",value : req.body.number_way},{name : "about_all_road",value : req.body.about_all_road},{name : "presentation_image",value : req.body.presentation_image}]
        for(let i of tableau){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).jsson({message})
            }
        }
        try {
            parent_road_model.create({
                identifiant : await require("../bd/schema/function_aut_increment_ident_for_commentary_model")(parent_road_model),
                name : tableau[0].value,
                choice_length : tableau[1].value,
                about_all_road : tableau[2].value,
                presentation_image : await require("../convert_image_to_string")(tableau[3].value)
            }).then((_)=>{
                const message = "Image inséré dans la basse de données"
                return res.json({message})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
            return res.status(500).json({message,error})
        }
    })
}