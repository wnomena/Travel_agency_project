const express = require("express")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const body_parser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const cookie_parser = require("cookie-parser")
const port = process.env.PORT | 5000
const getAllMembers  = require("./circuit_manager_only_by_admin/get_all_member")
// multer configuration
function restriction_if_login_thre_time(a,b){
    let table = []
    console.log(`return : ${a}`)
    if(require("./bd/local_restrinction_for_connexion_link_users").length > 3){
        if(JSON.stringify(require("./bd/local_restrinction_for_connexion_link_users")[require("./bd/local_restrinction_for_connexion_link_users").length - 1]) == JSON.stringify({link : a,mail : b}) && JSON.stringify(require("./bd/local_restrinction_for_connexion_link_users")[require("./bd/local_restrinction_for_connexion_link_users").length - 2]) == JSON.stringify({link : a,mail : b})){
            const message = "Trop de tentative, veuillez réessayer plus tard"
            while(table.length !== 0){
                table.pop()
            }
            table.push({message,acces : false})
        }else{
            const message = "Acces autorisé"
            while(table.length !== 0){
                table.pop()
            }
            table.push({message,acces : true})
        }
    }else{
        while(table.length !== 0){
            table.pop()
        }
        const message = "Acces autorisé"
        table.push({message,acces : true})
    }
    return table
}
require("./bd/connect_to_mongoose_bd")(mongoose)
app.use(express.json())
app.use(cors({
    origin : "https://wwww.caponmada.com",
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Response-Time'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus : 200
}))

app.use(cookie_parser())
app.use(body_parser.urlencoded({extended : true}))
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})

app.get("/",(req,res)=>{
    let a = btoa("rakotoarimalala")
    res.json(a)
})
const  model_utilisateur = require("./bd/schema/schema_users")
const commentary_model = require("./bd/schema/commentary_schema")
const member_model = require("./bd/schema/member_schema")
const parent_road_model = require("./bd/schema/road_parent_manager/parent_schema")
const child_road_model = require("./bd/schema/road_child_manager/child_road_schema")
const multer = require("./multer_middleware")
const add_contact = require("./add_contact")
const get_contact = require("./get_contact")
const vue_contact = require("./vue_contact")
const { contact_model } = require("./bd/schema/contact_schema")
// require("./function")(child_road_model)
app.get("/get_all_member", getAllMembers)
app.post("/client-contact",multer,add_contact)
app.get("/get_all_contact/:name",get_contact)
app.put("/update_contact/:name",multer,vue_contact)
//req image
require("./circuit_manager_only_by_admin/get_image")(app)
//get favorite road 
require("./circuit_manager_only_by_admin/get_favorite_road")(app,child_road_model)
//update member pass
require("./Login_and_subscription_and_log_out/member_auth/update_member_password")(app,model_utilisateur,member_model)
//put reaction
require("./circuit_manager_only_by_admin/make_one_way_a _favorite_of_client")(app,child_road_model)
//get all prent road to show client 
require("./circuit_manager_only_by_admin/get_all_parent_road_by_public_or_by_admin")(app,parent_road_model)
//get all child road to show client
require("./circuit_manager_only_by_admin/get_all_under_road_by_parent_id")(app,child_road_model)
//get parent road information to update by admin
require("./circuit_manager_only_by_admin/get_parent_way_to_update_by_admin")(app,parent_road_model)
//get child road to show client or to update by admin
require("./circuit_manager_only_by_admin/get_one_road_by_public_or_by_admin")(app,child_road_model)
//update parent road information by admin
require("./circuit_manager_only_by_admin/update_parent_circuit_by_id")(app,parent_road_model)
//update child road infromation by admin
require("./circuit_manager_only_by_admin/update_child_way_by_admin")(app,child_road_model)
//delete one parent
require("./circuit_manager_only_by_admin/delete_parent_circuit_by_users")(app,model_utilisateur,parent_road_model,child_road_model)
//delete all child road of the same ident
require("./circuit_manager_only_by_admin/delete_all_child_of_one_parent")(app,child_road_model)
//delete one child road bhy name 
require("./circuit_manager_only_by_admin/delete_under_circuit_by_users")(app,child_road_model)
//deleete member by other member
require("./delete_member")(app,model_utilisateur,model_utilisateur)
//ajout de nouveelle circuit parent
require("./circuit_manager_only_by_admin/add_circuit_by_users")(app,parent_road_model)
//ajout de nouveau circuit enfant
require("./circuit_manager_only_by_admin/add_under_circuit_by_users")(app,child_road_model,parent_road_model)
//creation de nouveau member par un admin
require("./member_manager/create_new_member")(app,model_utilisateur)
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
//forget_pass_uers
require("./Login_and_subscription_and_log_out/forget_password")(app,model_utilisateur,bcrypt)
//deconnexion
require("./Login_and_subscription_and_log_out/log_out")(app)
//Effacement de commentaire par un admin
require("./commentary_by_member/delete_commentary_by_admin")(app,commentary_model)
//get all commentary
require("./commentary_by_member/get_all_commentary_to_show_in_page")(app,commentary_model)
//get all admin or member
require("./Login_and_subscription_and_log_out/get_all_admin_or_all_members")(app,member_model,model_utilisateur)
//member_forget_pass
require("./Login_and_subscription_and_log_out/member_auth/member_forget_password")(app,member_model,bcrypt)
//fonction automatique pour expiration de token
require("./token_manager/to_know_if_its_time_to_begin_compter_for_expires_token")()
require("./token_manager/set_time_out_to_delete_value_in_random_reset_pass")()
app.listen(port,() => console.log("http://localhost:5000"))
