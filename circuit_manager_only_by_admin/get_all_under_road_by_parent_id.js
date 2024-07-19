module.exports = (app,child_road_model) =>{
    app.get("/:parent_circuit_id/public/way",(req,res)=>{
        if(req.params.parent_circuit_id == undefined || req.params.parent_circuit_id == ""){
            const message = "Veuillez vérifier les informations que vous avez saisi"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({parent_ident_equal_to_child : req.params.parent_circuit_id}).then((a)=>{
                const message ="Traitement reussi"
                let decrypted_value = []
                for(let i  = 0; i < a.length; i++){
                    decrypted_value.push({
                        parent_ident_equal_to_child: a[i].parent_ident_equal_to_child,
                        name: atob(a[i].name),
                        description: atob(a[i].description),
                        distance: atob(a[i].distance),
                        presentation_image: a[i].presentation_image, 
                        sejour_delay: atob(a[i].sejour_delay),
                        like_by_members: a[i].like_by_members,
                        price : atob(a[i].price),
                        difficulty : atob(a[i].difficulty)
                    })
                }
                return res.json({message,data : decrypted_value})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message})
        }
    })
}
//fonctionnel