module.exports = (app,model) =>{
    app.delete("/test_to_delete_all_/value_in/database",(req,res)=>{
        model.find().then((a)=>{
            a.forEach(element => {
             model.deleteOne({mail : element.mail}).then((b)=>{
                console.log(b)
             })
            });
            const message = "Toutes les données ont été effacer"
            return res.json({message})
            
        })
    })
}