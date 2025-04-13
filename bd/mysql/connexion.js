const mysql = require("mysql")

const config = require("./fonctionType")
const connexion = mysql.createPool({
    database : config.NAME,
    user : config.USER,
    password : config.PASS,
    host : config.HOST
})
module.exports = connexion