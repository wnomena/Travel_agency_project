function like() {}
like.prototype.getById = (id,result) => {
    sql.query(`SELECT * FROM like_by_members WHERE id=${id}`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}

like.prototype.getAll = (result) => {
    sql.query(`SELECT * FROM like_by_members`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}
like.prototype.insert = (data,result) => {
    sql.query(`INSERT INTO like_by_members (mail,road_id) VALUES ("${data.mail}","${data.road_id}")`,(error,res) => {
        if(error) {
            result(error,null)
            return
        } else {
            result(null,res)
            return
        }
    })
}

module.exports = like