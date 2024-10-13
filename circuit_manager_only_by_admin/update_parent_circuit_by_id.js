const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_parent_road/by_user/:id",multer,(req,res)=>{
        const body = JSON.parse(req.body.body)
         const arr = [{name : "name",value : body.name},{name : "description",value : body.about_all_road},{name : "presentation_image",value : req.file.filename},{name : "price",value : body.price}]
        if(req.params.id == undefined || req.params.id == ""){
            const message = "Champs requis"
            return res.status(400).json({message})
        }
        let name = btoa(arr[0].value);
        let about_all_road = btoa(arr[1].value);
        let presentation_image = btoa(arr[2].value);
        let price = btoa(arr[3].value);
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
                            default : 
                                price = a[0].price
                        }
                    }
                     else if(x == 2 && arr[x].value) {
                        presentation_image = `https://web.caponmada.com/get/${arr[x].value}`
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