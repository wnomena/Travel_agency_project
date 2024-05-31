const commentary_model = require("./bd/schema/commentary_schema");

module.exports = (app,commentary_model) =>{
    app.delete("/fafana",(req,res)=>{
        commentary_model.deleteMany().then((a)=>{
            return res.json({message :"vita"})
        })
    })
}