const mysql = require("mysql")
function db () {
    try {
        const db = mysql.createConnection({  host: "mala.gasyweb.com",  user: "caponmad_caponmada",  password: "Caponmada.com2025",  database:  "caponmad_database"});
    db.connect();
    console.log("Connected successfully")
    return db
    } catch (error) {
         console.log("error");
         
        db()
    }
}
module.exports = {
    db : db
}
