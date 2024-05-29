const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const body_parser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const cookie_parser = require("cookie-parser")
console.log("hello node")
function expiration_token(){
    setTimeout(() => {
        console.log("token_effacer")
        for(let i = 0; i < require("./bd/local_storage_token_to_reset_password").length;i++){
            require("./bd/local_storage_token_to_reset_password").pop()
        }
    }, 18000);
}
require("./bd/connect_to_mongoose_bd")(mongoose)
//all middelwares
app.use(express.json())
app.use(cors())
app.use(body_parser.urlencoded({extended : true}))
app.use((req,res,next)=>{
    console.log(req.url)
    if(req.url == "/send_mail/member"){
        console.log("token_créer")
        expiration_token()
    }
    next()
})
app.use(cookie_parser())
app.use("/utilisateurs/",require("./token_manager/verification_of_created_token"))
app.get("/",(req,res)=>{
    let a = btoa("rakotoarimalala")
    console.log(atob(a))
    res.json(a)
})
const  model_utilisateur = require("./bd/schema/schema_users")
const commentary_model = require("./bd/schema/commentary_schema")
const member_model = require("./bd/schema/member_schema")
//all_way
//creation de nouveau member par un admin
require("./member_manager/create_new_member")(app,member_model)
//supression de member par un admin
require("./member_manager/supression_de_member")(app,member_model,model_utilisateur)
//susscription_member
require("./Login_and_subscription_and_log_out/member_auth/subscription_member")(app,member_model,bcrypt)
//lgin_member
require("./Login_and_subscription_and_log_out/member_auth/member_login")(app,member_model,bcrypt)
// subscription way
require("./Login_and_subscription_and_log_out/test_of_deletion_value")(app,model_utilisateur)
//deletion of all information about users in database
require("./Login_and_subscription_and_log_out/subscription")(app,bcrypt,model_utilisateur)
//Login way
require("./Login_and_subscription_and_log_out/login")(app,bcrypt,model_utilisateur)
//send_mail_to_reset_password_member
require("./Login_and_subscription_and_log_out/member_auth/member_send_mail")(app,member_model)
//verification_of_sent_mail_to_member
require("./Login_and_subscription_and_log_out/member_auth/member_verification_mail")(app,member_model)
//update password
require("./Login_and_subscription_and_log_out/update_password")(app,model_utilisateur,bcrypt)
//add commentary by member
require("./commentary_by_member/add_commentary_by_member")(app,model_utilisateur,commentary_model)
//sent_of_mail tsy mande aloa hatreto noho ilay mailko nb:utilisateur
require("./Login_and_subscription_and_log_out/confirmation_generator/confirmation_random")(app,model_utilisateur)
//verification an le mail no envoyena
require("./Login_and_subscription_and_log_out/confirmation_generator/confirmation_of_sent_code")(app,model_utilisateur)
//mis è jours de mot de passe sans mettre l'ancien
require("./Login_and_subscription_and_log_out/forget_password")(app,model_utilisateur,bcrypt)
//deconnexion
require("./Login_and_subscription_and_log_out/log_out")(app)
app.listen(5000,()=>{console.log("http://localhost:5000")})

//route_necessaire
//connexion
