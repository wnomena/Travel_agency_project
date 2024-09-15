// const auth = require("../../token_manager/verification_of_created_token")
module.exports = (app,model_utilisateur,model_member) =>{
    app.put("/utilisateurs/update/password/member/:client_mail_for_updating/:type",(req,res)=>{
    console.log("lelena mandeana")
    const new_pass_and_last_pass_array = [{name : "old_pass",value : req.body.old_pass},{name : "new_pass",value : req.body.new_pass}]
    const table_model = [model_member,model_utilisateur]
    table_model[parseInt(req.params.type)].find({mail : btoa(req.params.client_mail_for_updating)}).then((resp) => {
        if(res.length !== 0) {
            if(new_pass_and_last_pass_array[0].value !== new_pass_and_last_pass_array[1].value) {
                update(table_model[parseInt(req.params.type)],resp,req,res)
            }
        }
    })
    })}

//route fonctionnel
function update(model,a,req,res)  {
    const bcrypt = require("bcrypt")
    bcrypt.hash(req.body.new_pass, 10).then((r) => {
        model.findByIdAndUpdate(a[0]._id,{mot_de_passe : r}).then((a) =>{
            console.log(a)
            return res.json({message : "password updated"})
        })
    })
}