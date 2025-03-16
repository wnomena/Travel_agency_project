
function ennumeration(index) {
    const array = ["utilisateurs","members","parent_road","child_road","commentary"]
    return array[index]
}
function _something_delete(app) {
    app.deleteMany({}).then((res) => {
        console.log(res)
    })
}
//get teste
async function get_value (db,database,id){
    let array = []
    if(id) db.query(`SELECT * FROM ${ennumeration(database)} WHERE id=${id}`, function (errors,rows, fields) {
        console.log(rows)
    })
    else await db.query(`SELECT * FROM ${ennumeration(database)}`,async function (errors,rows, fields) {
         for(let row in rows) {
            array.push({
                mail : rows[row].mail ,
                object :  rows[row].ogject,
                string : rows[row].string
            })

        }
        console.log(array)
    })
    setTimeout(() => {
        console.log(array)
    }, 1000);

}

function get_value_2 (db,database,id){
    if(id) return db.query(`SELECT (id,name,mail,AES_DESCRYPT(password,"azertyuiopqsdfghjklm") FROM ${ennumeration(database)} WHERE id=${id}`)
    else return db.query(`SELECT * FROM ${ennumeration(database)}`)
}

//insert
function insert_parent(db,object){
    db.query(`INSERT INTO parent_road (name,description,presentation_image,price,period,difficulty) VALUES ("${object.name}","${object.description}","${object.presentation_image}","${object.price}","${object.period}","${object.difficulty}")`)
}
function insert_child(db,object) {
    db.query(`INSERT INTO parent_road (name,parent_id,description,presentation_image,price,period,difficulty,sejours_delay,confort) VALUES ("${object.name}","${object.parent_id}","${object.description}","${object.presentation_image}","${object.price}","${object.period}","${object.difficulty}","${object.sejours_delay}","${object.confort}")`)
}
function insert_commentary(db,object) {
    db.query(`INSERT INTO commentary (mail,object,string) VALUES ("${object.mail}","${object.object}","${object.string}")`)
}
function insert_users(db,object) {
    db.query(`INSERT INTO utilisateurs (name,mail,password) VALUES ("${object.name}","${object.mail}",AES_ENCRYPT("${object.password}","${process.env.KEY}"))`)
}
function insert_member(db,object) {
    db.query(`INSERT INTO members (name,mail,password) VALUES ("${object.name}","${object.mail}",AES_ENCRYPT("${object.password}","${process.env.KEY}"))`)
}
//update 
function update_parent(db,object) {
    db.query(`UPDATE parent_road SET name="${object.name}",description="${object.description}",presentation_image="${object.presentation_image}",price="${object.price}",period="${object.period}",difficulty="${object.difficulty}" WHERE id=${object.id}`)
}
function update_child(db,object) {
    db.query(`UPDATE child_road SET name="${object.name}",description="${object.description}",presentation_image="${object.presentation_image}",price="${object.price}",period="${object.period}",difficulty="${object.difficulty}",sejours_delay="${object.sejours_delay}",confort="${object.confort}" WHERE id=${object.id}`)
}
//delete 
function delete_one_parent(db,int,id) {
    db.query(`DELETE FROM ${ennumeration(int)} WHERE id=${id}`)
}

module.exports = {
    _something_delete : _something_delete,
    get_value_2 : get_value_2,
    get_value : get_value,
    insert_parent : insert_parent,
    insert_child : insert_child,
    insert_commentary : insert_commentary,
    insert_users : insert_users,
    insert_member : insert_member,
    update_parent : update_parent,
    update_child : update_child,
    delete_one_parent : delete_one_parent


}