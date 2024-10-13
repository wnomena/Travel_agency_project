const fs = require("fs")
const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_child_way/by_user",multer,(req,res)=>{
        const body = JSON.parse(req.body.body)
        const array = [{name : "parent_ident_equal_to_child",value : body.parent_ident_equal_to_child},{name : "name",value : body.name},{name : "description",value : body.description},{name : "distance",value : body.distance},{name : "presentation_image",value : req.file.filename},{name : "sejour_delay",value : body.sejour_delay},{name : "price", value : body.price},{name : "period",value: body.period}]
        for( let i of array) if(!i.value) return res.status(400).json({message : "Vérifier toutes les informations que vous avez saisi"})
        try {
            parent_road_model.find({name : btoa(array[0].value)}).then((res) => {
                if(res.length !== 0) {
                    fs.unlink(`./file${Array.from(res[0].presentation_image.split("/"))[Array.from(res[0].presentation_image.split("/")).length -1]}`,(err) => console.log(err))
                    parent_road_model.findByIdAndUpdate(res[0]._id,{
                        description : btoa(body.description),
                        distance : btoa(body.distance),
                        presentation_image : `http://web.caponmada.com/get/${req.file.filename}`,
                        sejours_delay : btoa(body.sejours_delay),
                        price : btoa(body.price),
                        difficulty : btoa(body.difficulty),
                        confort : btoa(body.confort),
                        period : btoa(body.period)
                    }).then((resp) => {
                        res.json({message : "Route modifier"})
                    })
                }
            })
        } catch (error) {
            return res.status(500).json({message : error})
        }
        //tohizana rahapitso
    })
}