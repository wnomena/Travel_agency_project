const { find } = require("../function_reutiliser/find_all_user")
const multer = require("../multer_middleware")
module.exports = (app,model_utilisateurs) =>{
    app.post("/utilisateurs/by_admin/create/new_member",multer,async(req,res)=>{
        const all_value_sent_by_admin = [{name : "Name",value : req.body.nom_complet},{name : "mail",value : req.body.mail}]
        for(let i of all_value_sent_by_admin){
            if(i.value == "" || i.value == undefined){
                const message = "Champs requis"
                return res.status(401).json({message})
            }
        }
        try {

            const test = await add(model_utilisateurs,all_value_sent_by_admin,res)
            if(test) {
                const message = "New admin added"
                return res.json({message})
            } else {
                const message = "Use another mail"
                return res.status(400).json({message})
            }
        } catch (error) {
            console.log(error)
            const message = "Le serveur ne répond pas, veuillez réesssayer plus tard"
            return res.status(500).json({message,error})
        }
    })
}
async function add(model_member,all_value_sent_by_admin,res) {
    const list = await find(model_member)
    const filter = list.filter((table_list) => table_list.mail === all_value_sent_by_admin[1].value)
    if(filter.length == 0) {
            await model_member.create({
                mail : btoa(all_value_sent_by_admin[1].value),
                nom_complet : btoa(all_value_sent_by_admin[0].value),
                mot_de_passe : `CAPONMADA${new Date().getFullYear()}`
            })
            return true
        } else {
            return false
        }
    }