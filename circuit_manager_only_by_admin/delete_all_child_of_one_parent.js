module.exports = (app,child_road_model) =>{
    app.delete("/utilisateurs/delete_/value/of_one/:parent_id",(req,res)=>{
        if(req.params.parent_id == undefined || req.params.parent_id == ""){
            const message = "Champes requis"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({parent_ident_equal_to_child : req.params.parent_id}).then((a)=>{
                if(a == [] || a == ""){
                    const message = "Aucune registre lier à cette information dans les registres"
                    return res.status(400).json({message})
                }
                child_road_model.deleteMany({parent_ident_equal_to_child : req.params.parent_id}).then((b)=>{
                    if(a.length > 1){
                        const message = `${a.length} circuits effacés`
                        return res.json({message})
                    }else{
                        const message = "Un circuit effacé"
                        return res.json({message})
                    }
                })
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}