const commentary_model = require("../bd/schema/commentary_schema")
const function_aut_increment_ident_for_commentary_model = require("../bd/schema/function_aut_increment_ident_for_commentary_model")
let date = new Date()
module.exports = (app,child_road_model) =>{
    app.put("/update/one_child_road/to_be_a_favorite/:member_mail/:road_name",(req,res)=>{
        const request_value = [{name : "member_mail",value : req.params.member_mail},{name: "road_name",value : req.params.road_name}]
        for(let i of request_value){
            console.log(i)
            if(i.value == undefined || i.value == ""){
                const message = "Vérifier les informations que vous avez saisi"
                return res.status(400).json({message})
            }
        }
        try {
             child_road_model.find({name : btoa(req.params.road_name)}).then((a)=>{
                let b = [...a[0].like_by_members]
                child_road_model.findByIdAndUpdate(a[0]._id,{like_by_members : [{mail : request_value[0].value},...a[0].like_by_members]}).then(b => {
                    return res.json({message : "élément ajouté dans les favoris", data : b})
                })
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}