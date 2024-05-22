const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
console.log("hello node")
require("./bd/connect_to_mongoose_bd")(mongoose)
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})
app.get("/",(req,res)=>{
    let a = btoa("rakotoarimalala")
    console.log(atob(a))
    res.json(a)
})
const  model_utilisateur = require("./bd/schema/schema_users")
const commentary_model = require("./bd/schema/commentary_schema")
//all_way
// subscription way
require("./Login_and_subscription_and_log_out/test_of_deletion_value")(app,model_utilisateur)
//deletion of all information about users in database
require("./Login_and_subscription_and_log_out/subscription")(app,bcrypt,model_utilisateur)
//Login way
require("./Login_and_subscription_and_log_out/login")(app,bcrypt,model_utilisateur)
//update password
require("./Login_and_subscription_and_log_out/update_password")(app,model_utilisateur,bcrypt)
//add commentary by member
require("./commentary_by_member/add_commentary_by_member")(app,model_utilisateur,commentary_model)

app.listen(5000,()=>{console.log("http://localhost:5000")})

//route_necessaire
//connexion
//      connexion admin
//      deconnexion admin
