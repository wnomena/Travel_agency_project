module.exports = (app,child_road_model,parent_road_model) =>{
    app.post("/utilisateurs/add_unders/circuit/by_users",(req,res)=>{
        const array_list = [{name : "ident_to_look_for_parent_ident",value : req.body.ident_to_look_for_parent_ident},{name : "name",value : req.body.name},{name : "description",value : req.body.description},{name : "distance",value : req.body.distance},{name : "presentation_image",value : req.body.presentation_image},{name : "sejour_delay",value : req.body.sejour_delay}]
        for(let i of array_list){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            parent_road_model.find({identifiant : array_list[0].value}).then(async(a)=>{
                if(a == "" || a == []){
                    const message = "Vérifiez les informations que vous avez saisi"
                    return res.status(400).json({message})
                }else{
                    await child_road_model.find({name : btoa(array_list[1].value)}).then(async(c)=>{
                        if(c == "" || c == []){
                            child_road_model.create({
                                parent_ident_equal_to_child : array_list[0].value,
                                name : btoa(array_list[1].value),
                                description : btoa(array_list[2].value),
                                distance : btoa(array_list[3].value),
                                presentation_image : await require("../convert_image_to_string")(array_list[4].value),
                                sejour_delay : btoa(array_list[5].value)
                            }).then((b)=>{
                                const message = "Votre nouveau circuit a été ajouté avec succès"
                                return res.json({message})
                            })
                        }else{
                            const message = "Veuillez utiliser d'autre nom"
                            return res.status(400).json({message})
                        }
                    })
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  plus tard"
            return res.status(500).json({message,error})
        }
    })
}
//fonctionnel