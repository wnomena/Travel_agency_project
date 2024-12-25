const multer = require("../../multer_middleware")
module.exports = (app,model_member,bcrypt) =>{
    app.post("/login/login_member",multer,(req,res)=>{
        const all_client_information = [{name : "mail",value : req.body.mail},{name : "mot_de_passe",value : req.body.mot_de_passe}]
        for(let i = 0; i < all_client_information.length; i++){
            if(all_client_information[i].value == "" || all_client_information[i].value == undefined){
                const message = "Required field"
                return res.status(400).json({message})
            }
        }
        try {
            model_member.find({mail : btoa(all_client_information[0].value)}).then((a)=>{
                console.log(a)
                if(a.length == 0){
                    const message = "Use another mail"
                    return res.status(400).json({message})
                }else{
                    bcrypt.compare(all_client_information[1].value,a[0].mot_de_passe).then(async(c)=>{
                        if(c){
                            const message = "Connexion done"
                            return res.json({message, data : a[0].mot_de_passe})
                        } else if(a[0].mot_de_passe == all_client_information[1].value) {
                            const message = "-1"
                            return res.json({message,data :  a[0].mot_de_passe})
                        }
                        else{
                            console.log(a[0].mot_de_passe,all_client_information[1].value)
                            const message = "Wrong password"
                            return res.status(400).json({message})
                        }
                    })
                }
            })
        } catch (error) {
            const message = "Le serveur ne répond pas, veuillez réessayer ultérierement \n " + error
            return res.status(500).json({message})
        }
    })
}