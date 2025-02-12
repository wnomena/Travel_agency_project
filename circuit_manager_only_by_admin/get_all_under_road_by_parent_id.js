module.exports = (app,child_road_model) =>{
    app.get("/:parent_circuit_id/public/way",(req,res)=>{
        if(req.params.parent_circuit_id == undefined || req.params.parent_circuit_id == "0"){
            child_road_model.find().then((a)=> {
                const message ="Traitement reussi"
                let decrypted_value = []
                for(let i  = 0; i < a.length; i++){
                    decrypted_value.push({
                        _id : a[i]._id,
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
                console.log(decrypted_value)
                return res.json({message,data : decrypted_value})
            })
        }
        else {
            try {
                child_road_model.find({parent_ident_equal_to_child : req.params.parent_circuit_id}).then(async(a)=>{
                    const message ="Traitement reussi"
                    let decrypted_value = []
                    for(let i  = 0; i < a.length; i++){
                        console.log(i)
                        decrypted_value.push({
                            _id : a[i]._id,
                            parent_ident_equal_to_child: a[i].parent_ident_equal_to_child,
                            name: atob(a[i].name),
                            description: atob(a[i].description),
                            distance: atob(a[i].distance),
                            presentation_image: a[i].presentation_image,
                            sejour_delay: atob(a[i].sejour_delay),
                            like_by_members: a[i].like_by_members,
                            price: atob(a[i].price),
                            difficulty: atob(a[i].difficulty)
                        })
                    }
                    console.log(decrypted_value)
                    return res.json({message, data : decrypted_value})
                })
            } catch (error) {
                const message = "Le serveur ne répond pas, veuillez réessayer  ultérieurement"
                return res.status(500).json({message})
            }
        }
    })
}
//fonctionnel fa misy