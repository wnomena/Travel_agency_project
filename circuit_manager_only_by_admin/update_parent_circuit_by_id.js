const multer = require("../multer_middleware")
const {  unlink_function } = require("../unlink_function")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_parent_road/by_user/:id",multer,(req,res)=>{
        const body = req.body
         const arr = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined },{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty}]
        if(req.params.id == undefined || req.params.id == ""){
            const message = "Required Field"
            return res.status(400).json({message})
        }
        let name = btoa(arr[0].value);
        let description = btoa(arr[1].value);
        let presentation_image = btoa(arr[2].value);
        let price = btoa(arr[3].value);
        let period = btoa(arr[4].value)
        let difficulty = btoa(arr[5].value)
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
                                description = a[0].description
                                break;
                            case 2:
                                presentation_image = a[0].presentation_image
                                break;
                            case 3 : 
                                price = a[0].price
                                break;
                            case 4:
                                period = a[0].period
                                break;
                            default:
                                difficulty = a[0].difficulty
                        }
                    }
                     else if(x == 2 && arr[x].value) {
                        unlink_function(a[0].presentation_image.split("/")[a[0].presentation_image.split("/").length - 1])
                        presentation_image = `${url}/get/${arr[x].value}`
                     }
                }
                parent_road_model.findByIdAndUpdate(a[0]._id,{identifiant : req.params.id,name : name, description : description, presentation_image : presentation_image,price : price,period : period, difficulty : difficulty}).then((a)=>{
                    const message = "Mopdification done"
                    return res.json({message})
                })
            })
        } catch (error) {
            const message = "Server crached"
            return res.status(500).json({message,error})
        }

    })
}