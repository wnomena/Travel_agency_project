module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_parent_road/by_user/:id",(req,res)=>{
        let name = req.body.name
         let about_all_road = req.body.about_all_road
        let presentation_image = req.body.presentation_image
        const arr = [{name : "name",value : req.body.name},{name : "description",value : req.about_all_road},{name : "presentation_image",value : req.body.presentation_image}]
        if(req.params.id == undefined || req.params.id == ""){
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        try {
            parent_road_model.find({identifiant : req.params.id}).then(async(a)=>{
                if(presentation_image !== undefined || presentation_image !== ""){
                    presentation_image = await require("../convert_image_to_string")(req.body.presentation_image)
                }
                const arr = [name,about_all_road,presentation_image]
                for(let x = 0; x < arr.length; i++){
                    if(arr[x] == undefined || arr[x] == ""){
                        switch (x) {
                            case 0:
                                name = a[0].name
                                break;
                            case 1:
                                about_all_road = a[0].about_all_road
                                break;
                            default:
                                presentation_image = a[0].presentation_image
                                break;
                        }
                    }
                }
                parent_road_model.findByIdAndUpdate(a[0]._id,{identifiant : req.params.id,name : name, about_all_road : about_all_road, presentation_image : presentation_image}).then((a)=>{
                    const message = "Modification effectué avec succès"
                    return res.json({message})
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plsu tard"
            return res.status(500).json({message,error})
        }

    })
}