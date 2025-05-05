const sql = require("../connexion")
function CommentaryModel() {}
CommentaryModel.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM commentary WHERE id="${id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}

CommentaryModel.prototype.GetAll = (result) => {
    sql.query(`SELECT * FROM commentary`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
CommentaryModel.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO commentary (mail,string) VALUES ("${data.mail}","${data.string}")`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
CommentaryModel.prototype.delete = (id,result) => {
    sql.query(`DELETE  FROM commentary WHERE id="${id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}   

module.exports = CommentaryModel