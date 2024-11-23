const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_parent_road/by_user/:id",multer,(req,res)=>{
        const body = req.body
         const arr = [{name : "name",value : body.name},{name : "description",value : body.desc},{name : "presentation_image",value : req.file.filename},{name : "price",value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`}]
        if(req.params.id == undefined || req.params.id == ""){
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        let name = btoa(arr[0].value);
        let about_all_road = btoa(arr[1].value);
        let presentation_image = btoa(arr[2].value);
        let price = btoa(arr[3].value);
        let period = btoa(arr[4].value)
        try {
            parent_road_model.find({identifiant : req.params.id}).then(async(a)=>{
                for(let x = 0; x < arr.length; x++){
                    console.log(arr[x].value)
                    if(arr[x].value == undefined || arr[x].value == ""){
                        console.log(arr[x].value)
                        switch (x) {
                            case 0:
                                name = a[0].name
                                break;
                            case 1:
                                about_all_road = a[0].about_all_road
                                break;
                            case 2:
                                presentation_image = a[0].presentation_image
                                break;
                            case 3 : 
                                price = a[0].price
                                break;
                            default:
                                period = a[0].period
                                break
                        }
                    }
                     else if(x == 2 && arr[x].value) {
                        presentation_image = `${url}/${arr[x].value}`
                     }
                }
                parent_road_model.findByIdAndUpdate(a[0]._id,{identifiant : req.params.id,name : name, about_all_road : about_all_road, presentation_image : presentation_image,price : price}).then((a)=>{
                    const message = "Modification effectué avec succès"
                    return res.json({message})
                })
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer plsu tard"
            return res.status(500).json({message,error})
        }

    })
}