module.exports = (app,child_road_model) =>{
    app.get("/public_get/parent_way/one_road/:by_name",()=>{
        if(req.params.by_name){
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({name : req.params.by_name}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Résultat vide"
                    return res.json({message})
                }else if(a.length == 1){
                    const message = "On a trouver un résultat"
                    return res.json({message,data : a})
                }else{
                    const message = "Les résultats de votre recherche"
                    return res.json({message,data : a})
                }
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}