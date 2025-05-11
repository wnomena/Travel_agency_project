const sql = require("../connexion")
function ContactModel() {}
ContactModel.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM contact WHERE id="${id}"`, (error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            res.forEach(element => {
                console.lo
            if(element.vue == 0) {
            sql.query(`UPDATE contact SET vue="1" WHERE id="${element.id}"`, (_error,_res) => {
            console.log(res)
            result(null,res)
            return
                    })
                } else {
                    result(null,res)
                    return
                }
            } 
        );
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
ContactModel.prototype.insert = function (data,result) {
    sql.query(`INSERT INTO contact (name,mail,object,corps,vue) VALUES ("${data.name}","${data.mail}","${data.object}","${data.corps}","${data.vue}")`,function (err,res) {
        if(err) {
            result(err,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
ContactModel.prototype.update = (data,result) => {
        if(data.vue == 0) {
            sql.query(`UPDATE contact SET vue="1" WHERE id="${data}"`, (error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
    } 
}
module.exports = ContactModel
