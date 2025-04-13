const config = require("../fonctionType")
const sql = require("../connexion")
//All function for user
function User() {}
User.prototype.getById = (mail,result) => {
    sql.query(`SELECT id,name,mail,AES_DECRYPT(password,${config.KEY}) AS password FROM utilisateurs WHERE mail=${mail}`,function (error,res){
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
User.prototype.getAll = (result) => {
    sql.query(`SELECT id,name,mail,AES_DECRYPT(password,${config.KEY}) AS password FROM utilisateurs`,function (error,res) {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
User.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO utilisateurs (name,mail,AES_DECRYPT(password,${config.KEY})) VALUES ("${data.name}","${data.mail}","${data.password}")`,function (error,res) {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
User.prototype.delete = (id,result) => {
    sql.query(`DELETE FROM utilisateurs WHERE id="${id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
//Members
function Member() {}
Member.prototype.getById = (mail,result) => {
    sql.query(`SELECT id,name,mail,AES_DECRYPT(password,${config.KEY}) AS password FROM members WHERE mail="${mail}"`,function (error,res){
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
Member.prototype.getAll = (result) => {
    sql.query(`SELECT id,name,mail,AES_DECRYPT(password,${config.KEY}) AS password FROM members`,function (error,res) {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
Member.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO members (name,mail,AES_ENCRYPT(password,${config.KEY})) VALUES ("${data.name}","${data.mail}","${data.password}")`,function (error,res) {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
Member.prototype.update = (data,result) => {
    sql.query(`UPDATE members SET password=AES_ENCRYPT(password,"${data.password}") WHERE id="${data.id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(res,null)
            return
        }
    })
}
Member.prototype.delete = (id,result) => {
    sql.query(`DELETE FROM members WHERE id="${id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
module.exports = {
    User,
    Member
}