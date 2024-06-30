module.exports = (app,child_road_model) =>{
    app.put("/update/one_child_road/to_be_a_favorite/:member_mail/:road_name",async(req,res)=>{
        const request_value = [{name : "member_mail",value : req.params.member_mail},{name: "road_name",value : req.params.road_name}]
        for(let i of request_value){
            if(i.value == undefined || i.value == ""){
                const message = "Vérifier les informations que vous avez saisi"
                return res.status(400).json({message})
            }
        }
        try {
            await child_road_model.find({name : btoa(req.params.road_name)}).then(async(a)=>{
                let b = [...a[0].like_by_members]
                await new Promise((resolve) =>{
                    resolve(b.filter((element)=> element == req.params.member_mail))
                }).then(async(v)=>{
                    if(v.length == 0){
                        await child_road_model.findByIAndUpdate(a[0]._id,{like_by_members : [...a[0].like_by_members,req.params.member_mail]}).then((a)=>{
                            return false;
                        })
                    }else{
                       await new Promise(function(resolve){
                           resolve(b.filter((element)=> element !== v))
                        }).then((f)=>{
                            child_road_model.findByIAndUpdate(a[0]._id,{ like_by_members : f}).then((_)=>{
                                return false
                            })
                        })
                    }
                })
            })
        } catch (error) {
            const message = "Le serveur ne répon pas, veuillez réessayer  ultérieurement"
            return res.status(500).json({message,error})
        }
    })
}