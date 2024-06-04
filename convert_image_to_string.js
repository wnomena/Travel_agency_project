const fs = require("node:fs")
const path = require("node:path")
module.exports = (a) =>{
    let get_img_way_from_users_computer;
    try {
        get_img_way_from_users_computer = fs.readFileSync(a.String(),"utf8")
    } catch (error) {
        return "Quelques chosse s'est mal passer " + error
    }
    return [{image : Buffer.from(get_img_way_from_users_computer).toString("base64"),file_name : path.basename.toString().split(".")[0],extention_file_name : path.extname}]
}