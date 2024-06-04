module.exports = (app,model_utilisateurs) =>{
    app.post("utilisateurs/add_avant_post/by_user",(req,res)=>{
        const tableau = [{name : "name",value : req.body.name},{name : "number_way",value : req.body.number_way},{name : "about_all_road",value : req.body.about_all_road},{name : "presentation_image",value : req.body.presentation_image},{name : ""}]
    })
}