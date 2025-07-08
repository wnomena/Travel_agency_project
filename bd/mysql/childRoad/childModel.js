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
     if(id == "undefined") {
        console.log(id)
        sql.query(`SELECT * FROM child_road`,(error,res) => {
            if(error) {
                result(error,null)
                return
            } else {
                result(null,res)
                return
            }
        })
    } else {
        sql.query(`SELECT * FROM child_road WHERE parent_id="${id}"`,(error,res) => {
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
    sql.query(`INSERT INTO child_road (name,parent_id,description,presentation_image,price,period,difficulty,distance,sejour_delay,confort,carte) VALUES ("${data.name}","${data.parent_id}","${data.description}","${data.presentation_image}","${data.price}","${data.period}","${data.difficulty}","${data.distance}","${data.sejours_delay}","${data.confort}","${data.carte}")`,(error,res) => {
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
    console.log(data)
    sql.query(`UPDATE child_road  SET name="${data.name}",description="${data.description}",presentation_image="${data.presentation_image}",price="${data.price}",period="${data.period}",difficulty="${data.difficulty}",distance="${data.distance}",sejour_delay="${data.sejour_delay}",confort="${data.confort}" WHERE id="${data.id}"`,(error,res) => {
            result(error,res)
            return
    })
}
module.exports = Child