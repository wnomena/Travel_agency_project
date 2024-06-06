module.exports = (app,child_road_model) =>{
    app.get("/:parent_circuit_id/public/way",(req,res)=>{
        if(req.params.parent_circuit_id == undefined || req.params.parent_circuit_id == ""){
            const message = "Veuillez vérifier les informations que vous avez saisi"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({parent_ident_equal_to_child : req.params.parent_circuit_id}).then((a)=>{
                const message ="Traitement reussi"
                return res.json({message,data : a})
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message})
        }
    })
}