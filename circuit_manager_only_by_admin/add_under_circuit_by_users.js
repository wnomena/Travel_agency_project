const multer = require("../multer_middleware")
module.exports = (app,child_road_model,parent_road_model) =>{
    app.post("/utilisateurs/add_unders/circuit/by_users",multer,(req,res)=>{
        let body = JSON.parse(req.body.body)
        console.log(body)
        const array_list = [{name : "parent_ident_equal_to_child",value : body.parent_ident_equal_to_child},{name : "name",value : body.name},{name : "description",value : body.description},{name : "distance",value : body.distance},{name : "presentation_image",value : req.file.filename},{name : "sejour_delay",value : body.sejour_delay},{name : "price", value : body.price},{name : "difficulte",value : body.difficulty},{name : "confort", value : body.confort},{name : "period",value : body.period}]
        for(let i of array_list){
            console.log(i)
            if(i.value == "" || i.value == undefined){
                console.log(i)
                const message = "Champs requis"
                return res.status(400).json({message})
            }
        }
        try {
            parent_road_model.find({identifiant : array_list[0].value}).then(async(a)=>{
                if(a.length == 0){
                    const message = "Vérifiez les informations que vous avez saisi"
                    return res.status(400).json({message})
                }else{
                    await child_road_model.find({name : btoa(array_list[1].value)}).then(async(c)=>{
                        if(c.length == 0){
                            child_road_model.create({
                                parent_ident_equal_to_child : array_list[0].value,
                                name : btoa(array_list[1].value),
                                description : btoa(array_list[2].value),
                                distance : btoa(array_list[3].value),
                                presentation_image : `https://web.caponmada.com/get/${array_list[4].value}`,
                                sejour_delay : btoa(array_list[5].value),
                                price : btoa(array_list[6].value),
                                difficulty : btoa(array_list[7].value),
                                confort : btoa(array_list[8].value),
                                period : btoa(array_list[9].value)
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
// parser misy olana