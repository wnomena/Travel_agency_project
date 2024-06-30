module.exports = (app,child_road_model) =>{
    app.get("/public_get/one_road/:by_name",(req,res)=>{
        if(req.params.by_name == "" || req.params.by_name == undefined){
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({name : btoa(req.params.by_name)}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Résultat vide"
                    return res.json({message})
                }else if(a.length == 1){
                    const message = "On a trouver un résultat"
                    console.log(atob(a[0].name))
                    return res.json({message,data : {
                        parent_ident_equal_to_child: a[0].parent_ident_equal_to_child,
                        name: atob(a[0].name),
                        description: atob(a[0].description),
                        distance: atob(a[0].distance),
                        presentation_image : a[0].presentation_image,
                        sejour_delay: atob(a[0].sejour_delay),
                        like_by_members: a[0].like_by_members
                    }})
                }else{
                    const message = "Les résultats de votre recherche"
                    let decryptage_value = []
                    for(let i = 0; i < a.length; i++){
                        decryptage_value.push({
                            parent_ident_equal_to_child: a[i].parent_ident_equal_to_child,
                            name: atob(a[i].name),
                            description: atob(a[i].description),
                            distance: atob(a[i].distance),
                            presentation_image: a[i].presentation_image, 
                            sejour_delay: atob(a[i].sejour_delay),
                            like_by_members: a[i].like_by_members
                        })
                    }
                    return res.json({message,data : decryptage_value})
                }
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}