const multer = require("../multer_middleware")
module.exports = (app,parent_road_model) =>{
    app.put("/utilisateurs/update_child_way/by_user/:id",multer,(req,res)=>{
        const body = JSON.parse(req.body.body)
        const array = [{name : "parent_ident_equal_to_child",value : body.parent_ident_equal_to_child},{name : "name",value : body.name},{name : "description",value : body.description},{name : "distance",value : body.distance},{name : "presentation_image",value : req.file.filename},{name : "sejour_delay",value : body.sejour_delay},{name : "price", value : body.price}]
        //tohizana rahapitso
    })
}