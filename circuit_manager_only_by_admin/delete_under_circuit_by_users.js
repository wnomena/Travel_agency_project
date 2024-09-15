const fs = require("fs")
module.exports = (app,child_road_model) =>{
    app.delete("/utilisateurs/delete/child_road/:name",(req,res)=>{
        if(req.params.name == undefined || req.params.name == ""){
            const message = "Veuillez vérifier l'élément à supprimer"
            return res.stauts(400).json({message})
        }
        try {
            child_road_model.find({name : btoa(req.params.name)}).then((a)=>{
                if(a == "" || a == undefined){
                    const message = "Veuillez vérifier l'élément à supprimer"
                return res.stauts(400).json({message})
                }
                child_road_model.deleteOne({name : btoa(req.params.name)}).then((b)=>{
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