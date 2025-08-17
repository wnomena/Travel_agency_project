const sql = require("../connexion")
function ParentRoad() {}
ParentRoad.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM parent_road WHERE id=${id}`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}

ParentRoad.prototype.getAll = (result) => {
    sql.query(`SELECT * FROM parent_road`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
ParentRoad.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO parent_road (name,description,presentation_image,price,period) VALUES ("${data.name}","${data.description}","${data.presentation_image}","${data.price}","${data.period}")`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
ParentRoad.prototype.delete = (id,result) => {
    sql.query(`DELETE FROM parent_road WHERE id="${id}"`,(error,res) => {
            result(error,res)
            return
    })
}
ParentRoad.prototype.update = (data,result) => {
    sql.query(`UPDATE parent_road  SET name="${data.name}",description="${data.description}",presentation_image="${data.presentation_image}",price="${data.price}",period="${data.period}" WHERE id="${data.id}"`,(error,res) => {
            result(error,res)
            return
    })
}
module.exports = ParentRoad