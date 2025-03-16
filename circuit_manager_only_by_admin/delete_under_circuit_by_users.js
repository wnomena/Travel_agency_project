function find_one_and_unlink(name) {
    fs.unlink(`./file/${name}`,(err) => console.log(err))
}
const fs = require("fs")
module.exports = (app,child_road_model) =>{
    app.delete("/utilisateurs/delete/child_road/:name",(req,res)=>{
        if(req.params.name == undefined || req.params.name == ""){
            const message = "Veuillez vérifier l'élément à supprimer"
            return res.stauts(400).json({message})
        }
        try {
            child_road_model.find({_id : req.params.name}).then((a)=>{
                if(a == "" || a == undefined){
                const message = "Veuillez vérifier l'élément à supprimer"
                return res.stauts(400).json({message})
                }
                child_road_model.deleteOne({_id : req.params.name}).then((b)=>{
                    find_one_and_unlink(a[0].presentation_image.split("/")[a[0].presentation_image.split("/").length - 1])
                    const message = "Action effectuer avec succès"
                    return res.json({message})
                })
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}