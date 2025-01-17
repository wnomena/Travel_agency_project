const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_child_way/by_user",multer,(req,res)=>{
        const body = req.body
        console.log(body) //teste
         const arr = [{name : "name",value : body.name},{name : "about_all_road",value : body.desc},{name : "presentation_image",value : req.file ? req.file.filename : undefined},{name : "prix", value : body.price},{name : "period", value : `${body.period_B} ${body.period_E}`},{name : "dificulter",value : body.difficulty},{name : "distance", value : body.distance},{name : "sejours_delay", value : `${body.sejours_delay_B} ${body.sejours_delay_E}`}, {name : "confort", value : body.confort}]
        let name = btoa(arr[0].value);
        let description = btoa(arr[1].value);
        let presentation_image = btoa(arr[2].value);
        let price = btoa(arr[3].value);
        let period = btoa(arr[4].value)
        let difficulty = btoa(arr[5].value)
        let distance = btoa(arr[6].value);
        let sejours_delay = btoa(arr[7].value);
        let confort  = btoa(arr[8].value);
        // like_by_members parent_ident_equal_to_child
        try {
            parent_road_model.find({name : btoa(req.body.name)}).then(async(a)=>{
                console.log(a)
                name = a[0].name
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
                            case 5:
                                difficulty = a[0].difficulty
                                break;
                            case 6:
                                distance = a[0].distance
                                break;
                            case 7:
                                sejours_delay = a[0].sejours_delay
                                break;
                            default:
                                confort = a[0].confort
                        }
                    }
                     else if(x == 2 && arr[x].value) {
                        unlink_function(a[0].presentation_image.split("/")[a[0].presentation_image.split("/").length - 1])
                        presentation_image = `${url}/get/${arr[x].value}`
                     }
                }
                parent_road_model.findByIdAndUpdate(a[0]._id,{parent_ident_equal_to_child : req.body.parent_ident_equal_to_child,name : name, description : description, presentation_image : presentation_image,price : price,period : period, difficulty : difficulty, distance : distance,sejours_delay : sejours_delay, confort : confort}).then((a)=>{
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
/*
/utilisateurs/update_child_way/by_user
{
                        description : btoa(body.description),
                        distance : btoa(body.distance),
                        presentation_image : `${url}/${req.file.filename}`,
                        sejours_delay : btoa(body.sejours_delay),
                        price : btoa(body.price),
                        difficulty : btoa(body.difficulty),
                        confort : btoa(body.confort),
                        period : btoa(body.period)
                    }
*/