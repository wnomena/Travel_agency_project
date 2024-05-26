module.exports = (res) =>{
    const bcrypt = require("bcrypt")
    let return_value = []
    const lettre = "azertyuopqsdfghjklmwxcvbn"
    const Maj = "AZERTYUIOPQSDFGHJKLMWXCVBN"
    const number = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
    const caratere = "&é(-è_çà)=:!()<>|+‹›⁽⁾-{}«»&é(-è_çà)=:!()<>|+‹›⁽⁾-{}«»"
    const token_array = [lettre,number,caratere,Maj]
    let length = Math.floor(Math.random() * (100 - 50)) + 50
    let array_asembly;
    for(let x = 0; x <= length; x++){
        if(array_asembly == undefined){
            array_asembly = token_array[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 25)]
        }else{
            array_asembly = array_asembly + token_array[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 25)]
        }
    }
    console.log(array_asembly)
    bcrypt.hash(array_asembly,10).then((g)=>{
        return_value.push(g)
    })
    console.log(return_value)
    return return_value[0]
}
//api est fonctionnel