module.exports = (app,parent_road_model) =>{
    app.get("/get_all/parent_circuit",(req,res)=>{
        try {
             parent_road_model.find({}).then((a)=>{
                const message = "Les résultats de votre recherches"
                let decrypted_value = []
                for(let i = 0; i < a.length; i++){
                     decrypted_value.push({
                        identifiant : a[i].identifiant,
                        name : atob(a[i].name),
                        description : atob(a[i].description),
                        presentation_image : a[i].presentation_image,
                        price : atob(a[i].price),
                        period : atob(a[i].period),
                        difficulty : atob(a[i].difficulty)
                    })
                }
                console.log(decrypted_value)
                return res.json({message,data : decrypted_value})
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}
//fonctionnel