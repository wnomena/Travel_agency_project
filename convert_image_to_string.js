const fs = require("node:fs/promises")
const path = require("node:path")
module.exports = async(a) =>{
    let tableau_temp = []
    console.log(a)
   try {
            let b = await fs.readFile(a,{encoding : "utf8"})
            console.log(b)
        return [{image : Buffer.from(b),file_name : path.basename(a).split(".")[0],extention_file_name : path.extname(a)}]
   } catch (error) {
    console.log("Echec de l'iportation !")
   }
   return false
}