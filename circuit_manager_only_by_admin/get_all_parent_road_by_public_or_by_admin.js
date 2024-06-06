module.exports = (app,parent_road_model) =>{
    app.get("/get_all/parent_circuit",(req,res)=>{
        try {
            parent_road_model.find({}).then((a)=>{
                const message = "Les résultats de votre recherches"
                return res.json({message,data : a})
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}