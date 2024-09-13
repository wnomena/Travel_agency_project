module.exports = (app,child_road_model) =>{
    app.get("/public_get/parent_way/one_road/:by_name",(req,res)=>{
        if(!req.params.by_name){
            console.log(req.params.by_name)
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        try {
            child_road_model.find({identifiant : req.params.by_name}).then((a)=>{
                if(a == "" || a == []){
                    const message = "Résultat vide"
                    return res.json({message})
                }else if(a.length == 1){
                    const message = "On a trouver un résultat"
                    let decrypted_value = []
                for(let i = 0; i < a.length; i++){
                    decrypted_value.push({
                        identifiant : a[i].identifiant,
                        name : atob(a[i].name),
                        about_all_road : atob(a[i].about_all_road),
                        presentation_image : a[i].presentation_image,
                        price : atob(a[i].price),
                        period : atob(a[i].period)
                    })
                    return res.json({message,data : decrypted_value})}
                }else{
                    const message = "Les résultats de votre recherche"
                    let decrypted_value = []
                for(let i = 0; i < a.length; i++){
                    decrypted_value.push({
                        identifiant : a[i].identifiant,
                        name : atob(a[i].name),
                        about_all_road : atob(a[i].about_all_road),
                        presentation_image : a[i].presentation_image,
                        price : atob(a[i].price),
                        period : atob(a[i].period)
                    })
                }
                    return res.json({message,data : decrypted_value})
                }
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}