const sql = require("../connexion")
function Child() {}
Child.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM child_road WHERE id=${id}`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}

Child.prototype.getAll = (id,result) => {
    if(id) {
        sql.query(`SELECT * FROM child_road WHERE parent_id="${id}"`,(error,res) => {
            if(error) {
                result(error,null)
                return
            } else {
                result(null,res)
                return
            }
        })
    } else if(id == undefined || id == null) {
        sql.query(`SELECT * FROM child_road`,(error,res) => {
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
Child.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO child_road (name,parent_id,description,presentation_image,price,period,difficulty,distance,sejour_delay,confort) VALUES ("${data.name}","${data.parent_id}","${data.description}","${data.presentation_image}","${data.price}","${data.period}","${data.difficulty}","${data.distance}","${data.sejours_delay}","${data.confort}")`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
Child.prototype.delete = (id,result) => {
    sql.query(`DELETE FROM child_road WHERE id="${id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
Child.prototype.update = (data,result) => {
    sql.query(`UPDATE child_road  SET name="${data.name}",description="${data.description}",presentation_image="${data.presentation_image}",price="${data.price}",period="${data.period}",difficulty="${data.difficulty}",distance="${data.distance}",sejour_delay="${data.sejour_delay}",confort="${data.confort}" WHERE id="${data.id}"`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(res,null)
            return
        }
    })
}
module.exports = Child