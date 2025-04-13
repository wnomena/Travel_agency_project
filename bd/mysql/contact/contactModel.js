const sql = require("../connexion")
function ContactModel() {}
ContactModel.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM contact WHERE id="${id}"`, (error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
ContactModel.prototype.getAll = (result) => {
    sql.query(`SELECT * FROM contact`, (error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
ContactModel.prototype.update = (data,result) => {
    sql.query(`UPDATE contact SET vue="${data.vue}" WHERE id="${data.id}"`, (error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
module.exports = ContactModel